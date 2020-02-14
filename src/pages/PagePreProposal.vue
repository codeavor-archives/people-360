<template>
  <q-page padding>
    <pre-proposal></pre-proposal>
    <!-- <pre-proposal-folder></pre-proposal-folder> -->
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    "pre-proposal": require("components/Preproposal/PreproposalTable").default,
    "pre-proposal-folder": require("components/Preproposal/PreproposalFolders")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>