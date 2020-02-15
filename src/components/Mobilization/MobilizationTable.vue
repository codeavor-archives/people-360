<template>
  <q-page>
    <div>
      <div>
        <q-table
          :filter="filter"
          title="Mobilization Fees"
          color="primary"
          :data="mobilizationFees"
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
              <q-td :props="props" key="location">{{props.row.location}}</q-td>
              <q-td
                :props="props"
                key="oldClientPrice"
              >{{props.row.oldClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td
                :props="props"
                key="newClientPrice"
              >{{props.row.newClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditMobilizationFee(props.row)"
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
    <q-dialog v-model="showEditMobilization">
      <edit-mobilization
        @close="showEditMobilization = false"
        :mobilizationFee="mobilizationFee"
        :id="id"
      ></edit-mobilization>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      mobilizationFees: fs.collection("mobilizationFees")
    };
  },
  data() {
    return {
      filter: "",
      showEditMobilization: false,
      mobilizationFee: "",
      id: "",
      current: 1,
      columns: [
        {
          name: "location",
          align: "left",
          label: "Location",
          sortable: true,
          field: "location"
        },
        {
          name: "oldClientPrice",
          align: "left",
          label: "Old Client Price",
          sortable: true,
          field: "oldClientPrice"
        },
        {
          name: "newClientPrice",
          align: "left",
          label: "New Client Price",
          sortable: true,
          field: "newClientPrice"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditMobilizationFee(props) {
      this.showEditMobilization = true;
      this.mobilizationFee = props;
      this.id = props.id;
    }
  },
  components: {
    "edit-mobilization": require("components/Mobilization/Modals/EditMobilizationFee")
      .default
  }
};
</script>

<style>
</style>