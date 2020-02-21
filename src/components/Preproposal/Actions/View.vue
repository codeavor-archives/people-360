<template>
  <q-btn
    @click="addToView(proposal)"
    to="formal-quotation"
    round
    color="primary"
    flat
    dense
    icon="remove_red_eye"
  >
    <q-tooltip content-class="bg-red">View</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: {
    proposalId: String
  },
  methods: {
    addToView(proposal) {
      console.log(this.proposalId);
    }
  },
  mounted() {}
};
</script>

<style>
</style>