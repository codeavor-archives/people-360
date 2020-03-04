<template>
  <q-page padding>
    <billing></billing>
  </q-page>
</template>

<script>
export default {
  components: {
    billing: require("components/Billing/BillingTable").default
  }
};
</script>

<style>
</style>