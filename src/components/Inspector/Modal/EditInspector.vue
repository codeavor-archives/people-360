<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="fbEditInspector">
      <q-card-section class="row">
        <div class="text-h6">Edit Inspector</div>
        <q-space></q-space>
        <div>
          <q-btn v-close-popup flat round dense icon="close"></q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Inspector Name"
          v-model="inspector.name"
        >
          <template v-slot:append>
            <q-icon v-if="inspector.name" name="close" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Inspector Position"
          v-model="inspector.position"
        >
          <template v-slot:append>
            <q-icon v-if="inspector.position" name="close" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Schedule"
          v-model="inspector.schedule"
        >
          <template v-slot:append>
            <q-icon v-if="inspector.schedule" name="close" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Available"
          v-model="inspector.available"
        >
          <template v-slot:append>
            <q-icon v-if="inspector.available" name="close" class="cursor-pointer"></q-icon>
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
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["inspector", "id"],
  firestore() {
    return {
      inspectors: fs.collection("inspectors")
    };
  },
  methods: {
    fbEditInspector() {
      this.$q.loading.show();
      this.$firestore.inspectors
        .doc(this.id)
        .update(this.inspector)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.showEditInspector = false;
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.showEditInspector = false;
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>