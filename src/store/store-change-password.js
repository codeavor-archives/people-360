import { fb, db } from "boot/firebase";
import Vue from "vue";
import { Loading, LocalStorage, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { showSuccessMessage } from "src/functions/function-show-success-message";

const state = {};

const mutations = {};

const actions = {
  changePassword({}, payload) {
    var user = fb.auth().currentUser;
    var newPassword = payload.confirm_password;
    user
      .updatePassword(newPassword)
      .then(() => {
        Notify.create({
          message: "Password successfully changed!"
        });
      })
      .catch(error => {
        showErrorMessage(error.message);
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
