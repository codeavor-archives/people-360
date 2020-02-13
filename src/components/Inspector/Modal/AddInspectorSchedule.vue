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
        <q-select
          :rules="[val => !!val || 'Field is required']"
          v-model="inspectorSchedule.data"
          class="col"
          :options="inspectorsName"
          label="Inspector Name"
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
  props: ["start"],
  firestore() {
    return {
      positions: fs.collection("positions"),
      inspectors: fs.collection("inspectors"),
      inspectorSchedules: fs.collection("inspectorSchedules")
    };
  },
  data() {
    return {
      inspectorsName: [],
      inspectorSchedule: {
        data: "",
        start: "",
        title: "",
        createdby: "",
        id: ""
      }
    };
  },
  methods: {
    fbAddInspectorSchedule() {
      this.$q.loading.show();
      // Add some firestore add methods here
      this.inspectorSchedule.start = this.start;
      this.inspectorSchedule.id = this.inspectorSchedule.data.id;
      this.inspectorSchedule.createdby = fb.auth().currentUser.uid;
      this.inspectorSchedule.title =
        this.inspectorSchedule.data.email +
        " " +
        this.inspectorSchedule.data.position;
      this.$firestore.inspectorSchedules
        .add(this.inspectorSchedule)
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
  },
  mounted() {
    this.$binding("inspectorsName", fs.collection("inspectors"));
  }
};
</script>

<style>
</style>