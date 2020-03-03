import Vue from "vue";
import Vuex from "vuex";

let certificate = window.localStorage.getItem("certificate");
const state = {
  certificate: certificate ? JSON.parse(certificate) : []
};
const getters = {};
const mutations = {
  addToCertificate(state, item) {
    state.certificate.push(item);
    this.commit("storecertificates/saveData");
  },
  saveData(state) {
    window.localStorage.setItem(
      "certificate",
      JSON.stringify(state.certificate)
    ); //first parameter is any key string
  },
  removeItemFromCertificate(state, item) {
    let index = state.certificate.indexOf(item);
    state.certificate.splice(index, 1);
    this.commit("storecertificates/saveData");
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
