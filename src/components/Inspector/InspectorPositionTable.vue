<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Inspector Position Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="position in positions" :key="position.id">
              <td class="text-left">{{ position.positionName }}</td>

              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                  @click="showEditPositionModal(position)"
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
    <q-dialog v-model="showEditPosition">
      <edit-positon @close="showEditPosition = false" :position="position" :id="id"></edit-positon>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      positions: fs.collection("positions")
    };
  },
  data() {
    return {
      showEditPosition: false,
      id: "",
      position: {
        positionName: ""
      }
    };
  },
  methods: {
    showEditPositionModal(position) {
      this.showEditPosition = true;
      this.position = position;
      this.id = position.id;
      console.log(this.id);
    }
  },
  components: {
    "edit-positon": require("components/Inspector/Modal/EditPosition").default
  }
};
</script>

<style></style>
