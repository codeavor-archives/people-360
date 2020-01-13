import { fb, db } from "boot/firebase";
import Vue from "vue";
import { Loading, LocalStorage, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
let messagesRef;

const state = {
  loggedIn: false,
  userDetails: {},
  users: {},
  messages: {}
};

const mutations = {
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
        db.ref("users/" + userID).set(
          {
            name: payload.name,
            email: payload.email,
            online: true
          },
          error => {
            if (error) {
              showErrorMessage(error.message);
            } else {
              Notify.create({
                message: "Sucessfully Registered",
                position: "bottom",
                timeout: 1000,
                textColor: "white",
                actions: [{ icon: "close", color: "white" }]
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
      .then(response => {})
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
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        dispatch("storetasks/fbReadData", null, {
          root: true
        });
        let userID = fb.auth().currentUser.uid;
        db.ref("users/" + userID).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userID: userID
          });
        });
        dispatch("fbUpdateUser", {
          userID: userID,
          updates: {
            online: true
          }
        });
        dispatch("fbGetUsers", {});
        this.$router.push("/").catch(err => {});
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
    let userID = state.userDetails.userID;
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
