<template>
  <q-page padding>
    <pre-proposal></pre-proposal>
  </q-page>
</template>

<script>
export default {
  components: {
    "pre-proposal": require("components/Preproposal/PreproposalTable").default
  }
};
</script>

<style>
</style>