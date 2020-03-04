<template>
  <q-page padding>
    <ongoing-project></ongoing-project>
  </q-page>
</template>

<script>
export default {
  components: {
    "ongoing-project": require("components/Preproposal/OngoingPreproposalTable")
      .default
  }
};
</script>

<style>
</style>