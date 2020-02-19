<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
    >
      <pending-pre-proposal></pending-pre-proposal>
    </transition>

    <!-- <pre-proposal-folder></pre-proposal-folder> -->
  </q-page>
</template>

<script>
export default {
  components: {
    "pending-pre-proposal": require("components/Preproposal/PendingPreproposalTable")
      .default
  }
};
</script>

<style>
</style>