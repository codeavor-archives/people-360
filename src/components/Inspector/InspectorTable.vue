<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Inspector Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Position</th>
              <th class="text-left">Email</th>
              <th class="text-left">Available</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inspector, key) in inspectors" :key="key" :id="key">
              <td class="text-left">{{ inspector.name }}</td>
              <td class="text-left">{{ inspector.position }}</td>
              <td class="text-left">{{ inspector.email }}</td>
              <td class="text-left">
                <q-badge
                  :color="inspector.available ? 'green-7' : 'grey-4'"
                >{{ inspector.available ? 'Available': 'Deployed' }}</q-badge>
              </td>
              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                  @click="showEditInspectorModal(inspector, key)"
                  flat
                  dense
                  icon="edit"
                ></q-btn>
                <q-btn
                  round
                  color="primary"
                  @click="showAddInspectorSchedule(inspector, key)"
                  flat
                  dense
                  icon="add"
                ></q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
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
      }
    };
  },
  methods: {
    showEditInspectorModal(inspector) {
      this.showEditInspector = true;
      this.inspector = inspector;
      this.id = inspector.id;
      console.log(inspector.id);
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
