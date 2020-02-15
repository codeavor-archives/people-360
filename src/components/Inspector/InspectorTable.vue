<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Inspectors Table"
          color="primary"
          :data="inspectors"
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
              <q-td :props="props" key="name">{{props.row.name}}</q-td>
              <q-td :props="props" key="position">{{props.row.position}}</q-td>
              <q-td :props="props" key="email">{{props.row.email}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditInspectorModal(props.row)"
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
    <q-dialog v-model="showEditInspector">
      <edit-inspector @close="showEditInspector = false" :inspector="inspector" :id="id"></edit-inspector>
    </q-dialog>
    <q-dialog v-model="showAddInspectorSched">
      <add-inspector-schedule
        @close="showAddInspectorSched = false"
        :inspector="inspector"
        :id="id"
      ></add-inspector-schedule>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      inspectors: fs.collection("inspectors"),
      positions: fs.collection("positions")
    };
  },
  data() {
    return {
      inspectorSchedule: "",
      idInspector: "",
      key: {},
      id: "",
      showEditInspector: false,
      showAddInspectorSched: false,
      inspector: {
        id: "",
        name: "",
        available: "true"
      },
      filter: "",
      columns: [
        {
          name: "name",
          align: "left",
          label: "Full Name",
          sortable: true,
          field: "name"
        },
        {
          name: "position",
          align: "left",
          label: "Position",
          sortable: true,
          field: "position"
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          sortable: true,
          field: "email"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditInspectorModal(props) {
      this.showEditInspector = true;
      this.inspector = props;
      this.id = props.id;
      // console.log(inspector.id);
    },
    showAddInspectorSchedule(inspector) {
      this.showAddInspectorSched = true;
      this.inspector = inspector;
      this.id = inspector.id;
      console.log(inspector.id);
    }
  },
  components: {
    "edit-inspector": require("components/Inspector/Modal/EditInspector")
      .default,
    "add-inspector-schedule": require("components/Inspector/Modal/AddInspectorSchedule")
      .default
  }
};
</script>

<style></style>
