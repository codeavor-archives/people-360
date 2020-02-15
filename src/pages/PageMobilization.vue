<template>
  <q-page padding>
    <mobilization-table></mobilization-table>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddMobilization = true" color="primary" icon="note_add" />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showAddMobilization">
      <add-mobilization @close="showAddMobilization = false"></add-mobilization>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddMobilization: false
    };
  },
  components: {
    "mobilization-table": require("components/Mobilization/MobilizationTable")
      .default,
    "add-mobilization": require("components/Mobilization/Modals/AddMobilizationFee")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>