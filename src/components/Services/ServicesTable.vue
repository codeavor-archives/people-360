<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Equipment Category Table"
          color="primary"
          :data="services"
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
              <q-td :props="props" key="type">{{props.row.type}}</q-td>
              <q-td
                :props="props"
                key="oldClientPrice"
              >{{props.row.oldClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td
                :props="props"
                key="newClientPrice"
              >{{props.row.newClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td :props="props" key="equipment">{{props.row.equipment}}</q-td>
              <q-td :props="props" key="photo">
                <q-img avatar :src="props.row.photo" />
              </q-td>
              <q-td>
                <q-btn
                  @click="showEditServiceModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="edit"
                >
                  <q-tooltip content-class="bg-deep-orange">Edit</q-tooltip>
                </q-btn>
                <q-btn
                  @click="showAddChecklistModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="add"
                >
                  <q-tooltip content-class="bg-deep-orange">Add Checklist</q-tooltip>
                </q-btn>
                <q-btn
                  @click="showEditChecklistModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="remove_red_eye"
                >
                  <q-tooltip content-class="bg-deep-orange">View Checklist</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="showEditServices">
      <edit-services @close="showEditServices = false" :service="service" :id="id"></edit-services>
    </q-dialog>
    <q-dialog v-model="showAddChecklist">
      <add-checklist @close="showAddChecklist = false" :checklist="checklist"></add-checklist>
    </q-dialog>
    <q-dialog v-model="showEditChecklist">
      <edit-checklist @close="showEditChecklist = false" :checklist="checklist"></edit-checklist>
    </q-dialog>
  </q-page>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      services: fs.collection("services")
    };
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "type",
          align: "left",
          label: "Type",
          sortable: true,
          field: "type"
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
          name: "equipment",
          align: "left",
          label: "Equipment",
          sortable: true,
          field: "equipment"
        },
        {
          name: "photo",
          align: "left",
          label: "Photo",
          sortable: true,
          field: "photo"
        },
        {
          align: "left",
          label: "Action"
        }
      ],
      showEditServices: false,
      showAddChecklist: false,
      showEditChecklist: false,
      key: {},
      id: "",
      checklist: {},
      service: {
        id: "",
        name: "",
        equipment: "",
        personCount: "",
        dayCount: "",
        price: "",
        available: "true"
      }
    };
  },
  methods: {
    showEditServiceModal(props) {
      this.showEditServices = true;
      this.service = props;
      this.id = props.id;
      // console.log(service.id);
    },
    showAddChecklistModal(props) {
      this.showAddChecklist = true;
      this.checklist = props;
    },
    showEditChecklistModal(props) {
      this.showEditChecklist = true;
      this.checklist = props;
      console.log(props);
    }
  },
  components: {
    "edit-services": require("components/Services/Modal/EditServices").default,
    "add-checklist": require("components/Checklist/Modals/AddChecklist")
      .default,
    "edit-checklist": require("components/Checklist/Modals/EditChecklist")
      .default
  }
};
</script>