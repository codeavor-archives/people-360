<template>
  <q-page padding>
    <safety-associate v-if="setAdmin"></safety-associate>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddAssociate = true" color="primary" icon="note_add">
          <q-tooltip content-class="bg-deep-orange">Add Associate</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddAssociate">
      <add-safety-associate @close="showAddAssociate = false"></add-safety-associate>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddAssociate: false
    };
  },
  components: {
    "safety-associate": require("components/SafetyAssociate/SafetyAssociateTable")
      .default,
    "add-safety-associate": require("components/SafetyAssociate/Modals/AddSafetyAssociate")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>