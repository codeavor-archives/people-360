<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Equipment Type</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="editEquipmentType">
      <q-card-section>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Add Equipment Type"
          v-model="equipmentCategory.type"
        >
          <template v-slot:append>
            <q-icon v-if="equipmentCategory.type" name="close" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="save" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  props: ["equipmentCategory", "id"],
  firestore() {
    return {
      equipmentCategories: fs.collection("equipmentCategories")
    };
  },
  data() {
    return {};
  },
  methods: {
    editEquipmentType() {
      this.$q.loading.show();
      this.equipmentCategory.id = fb.auth().currentUser.uid;
      this.$firestore.equipmentCategories
        .doc(this.id)
        .update(this.equipmentCategory)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>