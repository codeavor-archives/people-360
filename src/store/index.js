import Vue from "vue";
import Vuex from "vuex";

import storetasks from "./store-tasks";
import storesettings from "./store-settings";
import auth from "./store-firebase";
import changepassword from "./store-change-password";
import changeprofile from "./store-change-profile";
import storeusers from "./store-users";
import storeevents from "./store-events";
import storeservices from "./store-services";
import storecertificates from "./store-print-certificate";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      storeusers,
      storetasks,
      storesettings,
      auth,
      changepassword,
      changeprofile,
      storeevents,
      storeservices,
      storecertificates
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
