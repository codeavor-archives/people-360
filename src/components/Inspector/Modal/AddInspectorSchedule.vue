<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="fbAddInspectorSchedule">
      <q-card-section class="row">
        <div class="text-h6">Add Inspector Schedule</div>
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
        <q-select
          :rules="[val => !!val || 'Field is required']"
          v-model="inspector.position"
          class="col"
          label="Inspector Position"
        ></q-select>
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
      positions: fs.collection("positions"),
      inspectors: fs.collection("inspectors")
    };
  },
  methods: {
    fbAddInspectorSchedule() {
      console.log(this.id);
      this.$q.loading.show();

      // Add some firestore add methods here

      this.$emit("close");
    }
  }
};
</script>

<style>
</style>