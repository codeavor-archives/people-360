<template>
  <q-page>
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Equipment Category Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in equipmentCategories" :key="category.id">
              <td class="text-left">{{category.type}}</td>
              <td class="text-left">
                <q-btn
                  @click="showEditTypeModal(category)"
                  round
                  color="primary"
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
    <q-dialog v-model="showEditType">
      <edit-category @close="showEditType = false" :equipmentCategory="equipmentCategory" :id="id"></edit-category>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      equipmentCategories: fs.collection("equipmentCategories")
    };
  },
  data() {
    return {
      id: "",
      showEditType: false,
      equipmentCategory: {
        id: "",
        type: ""
      }
    };
  },
  methods: {
    showEditTypeModal(category) {
      this.showEditType = true;
      this.equipmentCategory = category;
      this.id = category.id;
      console.log(category.id);
    }
  },
  components: {
    "edit-category": require("components/Services/Modal/EditEquipmentType")
      .default
  }
};
</script>

<style>
</style>