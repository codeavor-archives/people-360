import Vue from "vue";
import Vuex from "vuex";

let cart = window.localStorage.getItem("cart");
const state = {
  cart: cart ? JSON.parse(cart) : []
};
const getters = {
  totalPrice: state => {
    let total = 0;
    state.cart.filter(item => {
      total += item.service_price * item.service_quantity;
    });
    return total;
  }
};
const mutations = {
  addToCart(state, item) {
    let found = state.cart.find(
      product => product.service_Id == item.service_Id
    );
    if (found) {
      found.service_quantity++;
    } else {
      state.cart.push(item);
    }
    this.commit("storeservices/saveData");
  },
  saveData(state) {
    window.localStorage.setItem("cart", JSON.stringify(state.cart)); //first parameter is any key string
  },
  removeItemFromCart(state, item) {
    let index = state.cart.indexOf(item);
    state.cart.splice(index, 1);
    this.commit("storeservices/saveData");
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
