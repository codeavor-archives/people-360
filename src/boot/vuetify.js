// module.exports = {
//   rules: [
//     {
//       test: /\.s(c|a)ss$/,
//       use: [
//         "vue-style-loader",
//         "css-loader",
//         {
//           loader: "sass-loader",
//           // Requires sass-loader@^7.0.0
//           options: {
//             implementation: require("sass"),
//             fiber: require("fibers"),
//             indentedSyntax: true // optional
//           },
//           // Requires sass-loader@^8.0.0
//           options: {
//             implementation: require("sass"),
//             sassOptions: {
//               fiber: require("fibers"),
//               indentedSyntax: true // optional
//             }
//           }
//         }
//       ]
//     }
//   ]
// };

// src/main.js

import Vue from "vue";
// import vuetify from "@/plugins/vuetify"; // path to vuetify export

// new Vue({
//   vuetify
// }).$mount("#app");


import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import en from 'vuetify/es5/locale/en'

Vue.component('my-component', {
    methods: {
      changeLocale () {
        this.$vuetify.lang.current = 'en'
      },
    },
  })
  
  export default new Vuetify({
    lang: {
      locales: { en },
      current: 'en',
    },
  })