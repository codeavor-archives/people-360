<template>
  <q-page padding>
    <services-table></services-table>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddServices = true" color="primary" icon="build" />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddServices">
      <add-services @close="showAddServices = false"></add-services>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddServices: false
    };
  },
  components: {
    "services-table": require("components/Services/ServicesTable").default,
    "add-services": require("components/Services/Modal/AddServices").default
  }
};
</script>

<style>
</style>