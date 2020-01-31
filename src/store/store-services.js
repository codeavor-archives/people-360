import { fb, db } from "boot/firebase";
import Vue from "vue";
import Vuex from "vuex";
import { Loading, LocalStorage, Notify, uid } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

let cart = window.localStorage.getItem("cart");

const state = {
  cart: cart ? JSON.parse(cart) : []
};

const mutations = {
  addToCart(state, service) {
    let found = state.cart.find(service => service.id == service.id);
    if (found) {
      found.service_quantity++;
    } else {
      state.cart.push(service);
    }
    this.commit("saveData");
  },
  saveData(state) {
    window.localStorage.setItem("cart", JSON.stringify(state.cart)); //first parameter is any key string
  },
  removeItemFromCart(state, service) {
    let index = state.cart.indexOf(service);
    state.cart.splice(index, 1);
    this.commit("saveData");
  }
};
const actions = {};
const getters = {
  totalPrice: state => {
    let total = 0;
    state.cart.filter(service => {
      total += service.service_price * service.service_quantity;
    });
    return total;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
