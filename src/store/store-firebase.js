import { fb, db, fs, fc } from "boot/firebase";
import Vue from "vue";
import $ from "jquery";
import { Loading, LocalStorage, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
let messagesRef;
let ip;

const state = {
  loggedIn: false,
  ip: "",
  userDetails: {},
  users: {},
  systemUsers: {},
  messages: {},
  usersDownloaded: false,
  messagesDownloaded: false,
  setAdmin: false
};

const mutations = {
  setusersDownloaded(state, value) {
    state.usersDownloaded = value;
  },
  setusersAdmin(state, value) {
    state.setAdmin = value;
  },
  setmessagesDownloaded(state, value) {
    state.messagesDownloaded = value;
  },
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userID, payload.userDetails);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userID], payload.userDetails);
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageID, payload.messages);
  },
  clearMessages(state, payload) {
    state.messages = payload;
  }
};

const actions = {
  registerUser({}, payload) {
    Loading.show();
    fb.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let userID = fb.auth().currentUser.uid;
        fs.collection("users")
          .doc()
          .set(
            {
              name: payload.name,
              middleName: payload.middleName,
              lastName: payload.lastName,
              email: payload.email,
              roles: "new",
              companyName: payload.companyName,
              companyLocation: payload.location,
              phoneNumber: payload.phoneNumber,
              createdBy: userID
            },
            error => {
              if (error) {
                showErrorMessage(error.message);
              } else {
                Notify.create({
                  message:
                    "Sucessfully Registered, Please Verify email address",
                  position: "bottom",
                  timeout: 5000,
                  textColor: "white",
                  color: "teal-10",
                  actions: [{ icon: "close", color: "white" }]
                });
              }
            }
          );
        db.ref("users/" + userID).set(
          {
            // emailVerified: false,
            name: payload.name,
            middleName: payload.middleName,
            lastName: payload.lastName,
            email: payload.email,
            companyName: payload.companyName,
            companyLocation: payload.location,
            phoneNumber: payload.phoneNumber,
            roles: "new",
            online: true,
            createdBy: userID
          },
          error => {
            if (error) {
              showErrorMessage(error.message);
            } else {
              Notify.create({
                message: "Sucessfully Registered, Please Verify email address",
                position: "bottom",
                timeout: 5000,
                textColor: "white",
                color: "teal-10",
                actions: [{ icon: "close", color: "white" }]
              });
              let user = fb.auth().currentUser;
              fb.auth().signOut();
              user
                .sendEmailVerification()
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
        );
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  loginUser({}, payload) {
    Loading.show();
    fb.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {})
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    fb.auth().signOut();
  },
  handleAuthStateChange({ commit, dispatch, state }) {
    fb.auth().onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        let userID = fb.auth().currentUser.uid;
        db.ref("users/" + userID).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            middleName: userDetails.middleName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            roles: userDetails.roles,
            photo: userDetails.photo,
            companyName: userDetails.companyName,
            companyLocation: userDetails.companyLocation,
            phoneNumber: userDetails.phoneNumber,
            userID: userID
          });
        });

        user.getIdTokenResult().then(idTokenResult => {
          const admin = idTokenResult.claims.admin;
          // console.log(admin);
          if (admin == true) {
            commit("setusersAdmin", true);
            this.$router.push("/").catch(err => {});
          } else {
            this.$router.push("/services").catch(err => {});
          }
        });
        // if (user.emailVerified) {    == uncomment this after development
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        dispatch("storetasks/fbReadData", null, {
          root: true
        });
        let ipadd = "";
        $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?", data => {
          this.ipadd = JSON.stringify(data.responseJSON);
          // JSON.stringify(data.geobytesremoteip);
          console.log(JSON.stringify(data.geobytesremoteip));
          dispatch("fbUpdateUser", {
            userID: userID,
            updates: {
              ip: JSON.stringify(data.geobytesremoteip)
            }
          });
        });
        dispatch("fbUpdateUser", {
          userID: userID,
          updates: {
            online: true
            // ip: this.state.ip
          }
        });
        dispatch("fbGetUsers", {});
        // this.$router.push("/").catch(err => {});

        //  == uncomment this after development

        // } else {
        //   Loading.hide();
        //   Notify.create({
        //     message: "Please verify email address",
        //     position: "bottom",
        //     color: "primary",
        //     timeout: 5000,
        //     textColor: "white",
        //     actions: [{ icon: "close", color: "white" }]
        //   });
        // }

        // == uncomment this after development
      } else {
        commit("storetasks/clearTask", null, { root: true });
        commit("storetasks/setTaskDownloaded", false, { root: true });
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch(err => {});
        dispatch("fbUpdateUser", {
          userID: state.userDetails.userID,
          updates: {
            online: false
          }
        });
        commit("setUserDetails", {});
        commit("setusersAdmin", false);
      }
    });
  },
  fbUpdateUser({}, payload) {
    if (payload.userID) {
      db.ref("users/" + payload.userID).update(payload.updates, error => {
        if (error) {
          showErrorMessage(error.message);
        }
      });
    }
  },
  fbGetUsers({ commit }) {
    // Initial Check for Users
    let users = db.ref("users/");
    users.once("value", snapshot => {
      commit("setusersDownloaded", true);
    });
    db.ref("users").on("child_added", snapshot => {
      let userID = snapshot.key;
      let userDetails = snapshot.val();
      commit("addUser", {
        userID,
        userDetails
      });
    });
    db.ref("users").on("child_changed", snapshot => {
      let userID = snapshot.key;
      let userDetails = snapshot.val();
      commit("updateUser", {
        userID,
        userDetails
      });
    });
  },
  fbGetMessages({ state, commit }, id) {
    //Initialize Messages
    let userID = state.userDetails.userID;
    let message = db.ref("chats/" + userID + "/" + id);
    message.once("value", snapshot => {
      commit("setmessagesDownloaded", true);
    });

    //child Added hook
    messagesRef = db.ref("chats/" + userID + "/" + id);
    messagesRef.on("child_added", snapshot => {
      let messages = snapshot.val();
      let messageID = snapshot.key;
      commit("addMessage", {
        messageID,
        messages
      });
    });
  },
  fbStopGettingMessages({ commit }) {
    // console, console.log("firebase stop getting messages");
    if (messagesRef) {
      messagesRef.off("child_added");
    }
    commit("clearMessages", {});
  },
  fbSendMessages({}, payload) {
    // console.log(payload);
    db.ref(
      "chats/" + state.userDetails.userID + "/" + payload.otherUserID
    ).push(payload.message);
    payload.message.from = "them";
    db.ref(
      "chats/" + payload.otherUserID + "/" + state.userDetails.userID
    ).push(payload.message);
  }
};
const getters = {
  users: state => {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userID) {
        usersFiltered[key] = state.users[key];
      }
    });
    return usersFiltered;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
