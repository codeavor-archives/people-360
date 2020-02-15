<template>
  <q-page padding>
    <inspector-position-table v-if="admin"></inspector-position-table>
    <q-page-sticky v-if="admin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-tooltip content-class="bg-deep-orange">Add Position</q-tooltip>
        <q-fab-action @click="showAddPosition = true" color="primary" icon="build" />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddPosition">
      <add-inspector-position @close="showAddPosition = false"></add-inspector-position>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      admin: false,
      showAddPosition: false
    };
  },
  components: {
    "inspector-position-table": require("components/Inspector/InspectorPositionTable")
      .default,
    "add-inspector-position": require("components/Inspector/Modal/AddInspectorPosition")
      .default
  },
  mounted() {
    let user = fb.auth().currentUser;
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        if (admin == true) {
          this.admin = true;
        }
      });
    }
  }
};
</script>

<style></style>
