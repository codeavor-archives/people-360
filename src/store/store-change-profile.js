import { fb, db } from "boot/firebase";
import Vue from "vue";
import { Loading, LocalStorage, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { showSuccessMessage } from "src/functions/function-show-success-message";

const state = {};

const mutations = {};

const actions = {
  changeProfile({}, payload) {
    let userID = fb.auth().currentUser.uid;
    db.ref("users/" + userID).update(payload);
    Notify.create({
      message: "Profile successfully changed"
    });
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
