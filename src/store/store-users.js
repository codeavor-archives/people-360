import { fb, db } from "boot/firebase";
import Vue from "vue";
import { Loading, LocalStorage, Notify, uid } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  loggedIn: false,
  userDetails: {},
  users: {},
  messages: {},
  usersDownloaded: false,
  messagesDownloaded: false
};

const mutations = {
  setusersDownloaded(state, value) {
    state.usersDownloaded = value;
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

  clearMessages(state, payload) {
    state.messages = payload;
  }
};

const actions = {
  updateUser({ dispatch }, payload) {
    dispatch("fbUpdateUser", payload);
  },
  // addUser({ dispatch }, user) {
  //   let userID = uid();
  //   let payload = {
  //     id: userID,
  //     user: user
  //   };
  //   dispatch("fbAddUser", payload);
  // },
  fbAddUser({}, payload) {
    Loading.show();
    fb.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let userID = fb.auth().currentUser.uid;
        db.ref("users/" + userID).set(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            roles: "client",
            online: false
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
              this.$router.push("/users");
            }
          }
        );
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  fbUpdateUser({}, payload) {
    // let userID = fb.auth().currentUser.uid;
    // Please specify this ID

    db.ref("users/" + payload.id).update(payload.userDetails, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        // let keys = Object.keys(payload.userDetails);
        // if (!keys.length == 1) {
        Notify.create({
          message: "Users Updated",
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          actions: [{ icon: "close", color: "amber" }]
        });
        // }
      }
    });
    // console.log(payload.id, payload.userDetails)
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
  fbStopGettingMessages({ commit }) {
    // console, console.log("firebase stop getting messages");
    if (messagesRef) {
      messagesRef.off("child_added");
    }
    commit("clearMessages", {});
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
