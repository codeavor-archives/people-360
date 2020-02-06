<template>
  <q-page padding>
    <services-table v-if="admin"></services-table>
    <q-page-sticky v-if="admin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddServices = true" color="primary" icon="build" />
        <q-fab-action @click="showAddEquipment = true" color="primary" icon="note_add" />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddServices">
      <add-services @close="showAddServices = false"></add-services>
    </q-dialog>
    <q-dialog v-model="showAddEquipment">
      <add-equipment-category @close="showAddEquipment = false"></add-equipment-category>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      admin: false,
      showAddServices: false,
      showAddEquipment: false
    };
  },
  components: {
    "services-table": require("components/Services/ServicesTable").default,
    "add-services": require("components/Services/Modal/AddServices").default,
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