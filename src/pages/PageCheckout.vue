<template>
  <q-page padding>
    <q-pull-to-refresh @refresh="refresh">
      <checkout></checkout>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
export default {
  components: {
    checkout: require("components/Checkout/Checkout").default
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