import Vue from "vue";
import { uid, Notify } from "quasar";
import { fb, db } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

// import { db } from "../boot/firebase";
const state = {
  events: {},
  eventDownloaded: false
};

const mutations = {
  setEventDownloaded(state, value) {
    state.eventDownloaded = value;
  },
  addEvent(state, payload) {
    Vue.set(state.events, payload.id, payload.event);
  }
};
const actions = {
  addEvent({ dispatch }, event) {
    let eventID = uid();
    let payload = {
      id: eventID,
      event: event
    };
    dispatch("fbAddEvent", payload);
  },

  fbReadData({ commit }) {
    let userID = fb.auth().currentUser.uid;
    let userEvents = db.ref("inspectionEvent/" + userID);

    // Intial Check for data
    userEvents.once(
      "value",
      snapshot => {
        commit("eventDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );

    // child_added hook
    userEvents.on("child_added", snapshot => {
      let event = snapshot.val();
      let payload = {
        id: snapshot.key,
        event: event
      };
      commit("addEvent", payload);
    });
    // child_changed hook
    userEvents.on("child_changed", snapshot => {
      let event = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: event
      };
      commit("updateEvent", payload);
    });
    // child_removed
    userTasks.on("child_removed", snapshot => {
      let eventID = snapshot.key;
      commit("deleteEvent", eventID);
    });
  },
  fbAddEvent({}, payload) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userEvent = db.ref("inspectionEvent/" + userID + "/" + payload.id);
    userEvent.set(payload.event, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create({
          message: "Task Added",
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }]
        });
      }
    });
  },
  fbUpdateTask({}, payload) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userEvent = db.ref("inspectionEvent/" + userID + "/" + payload.id);

    userEvent.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        let keys = Object.keys(payload.updates);
        if (!(keys.includes("completed") && keys.length == 1)) {
          Notify.create({
            message: "Task Updated",
            position: "bottom",
            timeout: 1000,
            textColor: "white",
            actions: [{ icon: "close", color: "white" }]
          });
        }
      }
    });
  }
};

const getters = {
  events: state => {
    let eventsFiltered = {};
    Object.keys(state.events).forEach(key => {
      eventsFiltered[key] = state.events[key];
    });
    return eventsFiltered;
    // return state.events;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
