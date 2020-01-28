<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions("storesettings", ["getSettings"]),
    ...mapActions("auth", ["handleAuthStateChange"])
  },
  mounted() {
    this.getSettings();
    this.handleAuthStateChange();
  }
};
</script>
