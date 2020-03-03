<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Certificate Builder Table"
          color="primary"
          :data="certificates"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td :props="props" key="director">{{props.row.director}}</q-td>
              <q-td :props="props" key="logo">
                <q-img avatar :src="props.row.logo" />
              </q-td>
              <q-td>
                <q-btn
                  @click="showEditCertModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="edit"
                >
                  <q-tooltip content-class="bg-deep-orange">Edit</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="showEditCertificate">
      <edit-certificate @close="showEditCertificate = false" :certificate="certificate" :id="id"></edit-certificate>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      certificates: fs.collection("certificates")
    };
  },
  data() {
    return {
      certificate: {},
      filter: "",
      id: "",
      showEditCertificate: false,
      columns: [
        {
          name: "director",
          align: "left",
          label: "Director",
          sortable: true,
          field: "director"
        },
        {
          name: "logo",
          align: "left",
          label: "Logo",
          sortable: true,
          field: "type"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditCertModal(props) {
      this.showEditCertificate = true;
      this.certificate = props;
      console.log(props);
    }
  },
  components: {
    "edit-certificate": require("components/Certificates/Modals/EditCertificate")
      .default
  }
};
</script>

<style>
</style>