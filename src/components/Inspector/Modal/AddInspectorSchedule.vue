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
          v-model="inspectorSchedule.name"
        >
          <template v-slot:append>
            <q-icon v-if="inspectorSchedule.name" name="close" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
        <q-select
          :rules="[val => !!val || 'Field is required']"
          v-model="inspectorSchedule.position"
          class="col"
          label="Inspector Position"
        ></q-select>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="title"
          class="col"
          label="Event Title"
          v-model="inspectorSchedule.title"
        >
          <template v-slot:append>
            <q-icon v-if="inspectorSchedule.title" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          v-model="inspectorSchedule.start"
          :rules="[val => !!val || 'Field is required']"
          class="col"
          label="Start Date"
        >
          <template v-slot:append>
            <q-icon v-if="inspectorSchedule.start" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" landscape v-model="inspectorSchedule.start" />
              </q-popup-proxy>
            </q-icon>
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
      positions: fs.collection("positions"),
      inspectors: fs.collection("inspectors"),
      inspectionEvent: fs.collection("inspectionEvent")
    };
  },
  data() {
    return {
      inspectorSchedule: {
        name: "",
        position: "",
        start: "",
        title: ""
      }
    };
  },
  methods: {
    fbAddInspectorSchedule() {
      console.log(this.id);
      this.$q.loading.show();
      // Add some firestore add methods here
      this.$firestore.inspectionEvent
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
    this.inspectorSchedule.name = this.inspector.name;
    this.inspectorSchedule.position = this.inspector.position;
  }
};
</script>

<style>
</style>