<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
    >
      <approved-pre-proposal></approved-pre-proposal>
    </transition>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    "approved-pre-proposal": require("components/Preproposal/ApprovedPreproposalTable")
      .default,
    "pre-proposal-folder": require("components/Preproposal/PreproposalFolders")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    }
  }
};
</script>

<style>
</style>