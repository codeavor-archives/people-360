<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Equipment Type</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addEquipmentType">
      <q-card-section>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Equipment Type"
          v-model="equipmentCategory.type"
        >
          <template v-slot:append>
            <q-icon v-if="equipmentCategory.type" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-select
          :rules="[val => !!val || 'Field is required']"
          v-model="equipmentCategory.position"
          class="col"
          :options="options"
          label="Inspector Position"
        ></q-select>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Add Equipment Type" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      equipmentCategories: fs.collection("equipmentCategories"),
      positions: fs.collection("positions")
    };
  },
  data() {
    return {
      options: [],
      equipmentCategory: {
        id: "",
        type: "",
        subCategory: "",
        position: ""
      }
    };
  },
  methods: {
    addEquipmentType() {
      this.$q.loading.show();
      this.equipmentCategory.id = fb.auth().currentUser.uid;
      this.$firestore.equipmentCategories
        .add(this.equipmentCategory)
        .then(error => {
          if (error) {
            console.log(error);
            this.$q.loading.hide();
          } else {
            console.log(this.event);
            this.$q.loading.hide();
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.$emit("close");
    },
    getPositions() {
      let options = [];
      let positionRef = fs.collection("positions");
      let allPostion = positionRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            options.push(doc.data().positionName);
            // console.log(Object.values(doc));
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
      this.options = options;
    }
  },
  mounted() {
    this.getPositions();
  }
};
</script>

<style>
</style>