<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Position/Forty</th>
              <th class="text-left">Schedule</th>
              <th class="text-left">Available</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inspector, key) in inspectors" :key="key" :id="key">
              <td class="text-left">{{ inspector.name }}</td>
              <td class="text-left">{{ inspector.position }}</td>
              <td class="text-left">{{ inspector.email }}</td>
              <td class="text-left"></td>
              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                  @click="showEditInspectorModal(inspector, key)"
                  flat
                  dense
                  icon="edit"
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
      <edit-inspector
        @close="showEditInspector = false"
        :inspector="inspector"
        :id="key"
      ></edit-inspector>
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
      key: {},
      showEditInspector: false,
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
    }
  },
  components: {
    "edit-inspector": require("components/Inspector/Modal/EditInspector")
      .default
  }
};
</script>

<style></style>
