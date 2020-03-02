<template>
  <q-page class="q-pa-md">
    <inspector></inspector>
  </q-page>
</template>

<script>
export default {
  components: {
    inspector: require("components/Scheduling/SchedulingTable").default
  }
};
</script>

<style>
</style>