<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Mobilization Fee</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addMobilizationFee">
      <q-card-section>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Location"
          v-model="mobilizationFee.location"
        >
          <template v-slot:append>
            <q-icon v-if="mobilizationFee.location" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Old Client Price"
          v-model="mobilizationFee.oldClientPrice"
        >
          <template v-slot:append>
            <q-icon v-if="mobilizationFee.oldClientPrice" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="New Client Price"
          v-model="mobilizationFee.newClientPrice"
        >
          <template v-slot:append>
            <q-icon v-if="mobilizationFee.newClientPrice" name="close" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn icon="add" color="primary" type="submit" label="Add"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
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
      mobilizationFee: {
        id: "",
        location: "",
        newClientPrice: "",
        oldClientPrice: "",
        label: "",
        value: ""
      }
    };
  },
  methods: {
    addMobilizationFee() {
      this.$q.loading.show();
      (this.mobilizationFee.label = this.mobilizationFee.location),
        (this.mobilizationFee.value = this.mobilizationFee.location),
        (this.mobilizationFee.id = fb.auth().currentUser.uid);
      this.$firestore.mobilizationFees
        .add(this.mobilizationFee)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide;
        });

      this.$emit("close");
    }
  }
};
</script>

<style>
</style>