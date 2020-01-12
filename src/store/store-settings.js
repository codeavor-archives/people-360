import { LocalStorage } from "quasar";
const state = {
  settings: {
    show12HourFormat: false,
    showTaskInOneList: false
  }
};

const mutations = {
  setshow12HourFormat(state, value) {
    state.settings.show12HourFormat = value;
  },
  setshowTaskInOneList(state, value) {
    state.settings.showTaskInOneList = value;
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings);
  }
};

const actions = {
  setshow12HourFormat({ commit, dispatch }, value) {
    commit("setshow12HourFormat", value);
    dispatch("saveSettings");
  },
  setshowTaskInOneList({ commit, dispatch }, value) {
    commit("setshowTaskInOneList", value);
    dispatch("saveSettings");
  },
  saveSettings({ state }) {
    LocalStorage.set("settings", state.settings);
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) {
      commit("setSettings", settings);
    }
  }
};

const getters = {
  settings: state => {
    return state.settings;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
