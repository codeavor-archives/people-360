<template>
  <q-page padding>
    <inspector-table v-if="admin"></inspector-table>
    <q-page-sticky v-if="admin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddPosition = true" color="primary" icon="build" />
        <!-- <q-fab-action @click="onClick" color="primary" icon="mail" /> -->
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
    "inspector-table": require("components/Inspector/InspectorTable").default,
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
