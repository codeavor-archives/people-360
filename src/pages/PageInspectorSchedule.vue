<template>
  <q-page padding>
    <inspector-schedule></inspector-schedule>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action color="primary" icon="build" />
      </q-fab>
    </q-page-sticky>
    <!-- <q-dialog v-model="showAddServices">
      <add-services @close="showAddServices = false"></add-services>
    </q-dialog>-->
  </q-page>
</template>

<script>
export default {
  components: {
    "inspector-schedule": require("components/Inspector/InspectorScheduleTable")
      .default
  }
};
</script>

<style>
</style>