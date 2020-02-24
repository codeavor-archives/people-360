<template>
  <q-page padding>
    <certificate-table></certificate-table>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddCertificate = true" color="primary" icon="note_add">
          <q-tooltip content-class="bg-deep-orange">Add Certificate</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showAddCertificate">
      <add-certificate @close="showAddCertificate = false"></add-certificate>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      showAddCertificate: false
    };
  },
  components: {
    "certificate-table": require("components/Certificates/CertificateTable")
      .default,
    "add-certificate": require("components/Certificates/Modals/AddCertificate")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>