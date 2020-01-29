<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Services</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addServices">
      <q-card-section class="addusers">
        <div class="row q-mb-md">
          <q-input ref="name" class="col" v-model="service.name" label="Name" />
        </div>
        <div class="row q-mb-xs">
          <!-- <q-input
            type="email"
            ref="email"
            :rules="[
              val =>
                isValidEmailAddress(val) || 'Please enter a valid email address'
            ]"
            lazy-rules
            class="col"
            v-model="formData.email"
            label="Email"
          />-->
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Add to Inspector" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      services: fs.collection("services")
    };
  },
  data() {
    return {
      service: {
        id: "",
        name: "",
        equipment: "",
        personCount: "",
        dayCount: "",
        available: "true"
      }
    };
  },
  methods: {
    addServices() {
      this.$q.loading.show();
      this.$firestore.services
        .add(this.service)
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
    }
  }
};
</script>

<style>
</style>