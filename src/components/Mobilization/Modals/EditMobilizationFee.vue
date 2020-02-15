<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Mobilization Fee</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="editMobilization">
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
        <q-btn icon="save" color="primary" type="submit" label="Save"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { showErrorMessage } from "src/functions/function-show-error-message";
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["mobilizationFee", "id"],
  data() {
    return {};
  },
  firestore() {
    return {
      mobilizationFees: fs.collection("mobilizationFees")
    };
  },
  methods: {
    editMobilization() {
      //   console.log(this.mobilizationFee);
      //   console.log(this.id);
      this.$q.loading.show();
      this.mobilizationFee.updateBy = fb.auth().currentUser.uid;
      this.$firestore.mobilizationFees
        .doc(this.id)
        .update(this.mobilizationFee)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully changed",
            color: "primary",
            multiLine: true,
            actions: [
              {
                label: "Dismiss",
                color: "white",
                handler: () => {}
              }
            ]
          });
        })
        .catch(error => {
          console.log(error);
          showErrorMessage(error.message);
          this.$q.loading.hide();
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>