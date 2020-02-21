<template>
  <q-page padding>
    <equipment-category v-if="setAdmin"></equipment-category>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddEquipment = true" color="primary" icon="note_add">
          <q-tooltip content-class="bg-deep-orange">Add Equipment Type</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showAddEquipment">
      <add-equipment-category @close="showAddEquipment = false"></add-equipment-category>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      admin: false,
      showAddEquipment: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  },
  components: {
    "equipment-category": require("components/Services/EquipmentCategoryTable")
      .default,
    "add-equipment-category": require("components/Services/Modal/AddEquipmentType")
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

<style>
</style>