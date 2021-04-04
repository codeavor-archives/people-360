<template>
  <q-page class="q-pa-md">
    <!-- <inspector></inspector> -->
    <schedule></schedule>
  </q-page>
</template>

<script>
export default {
  components: {
    inspector: require("components/Scheduling/SchedulingTable").default,
    schedule:require("components/Scheduling/SchedulingModule").default
  }
};
</script>

<style>
</style>