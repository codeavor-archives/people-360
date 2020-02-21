<template>
  <q-page padding>
    <inspector-position-table v-if="setAdmin"></inspector-position-table>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
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
import { mapState, mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
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
