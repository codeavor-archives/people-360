<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Services</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addServices">
      <q-card-section class="addusers">
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Equipment/Service Name"
          v-model="service.name"
        >
          <template v-slot:append>
            <q-icon v-if="service.name" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Equipment"
          v-model="service.equipment"
        >
          <template v-slot:append>
            <q-icon v-if="service.equipment" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Person Needed"
          v-model="service.personCount"
        >
          <template v-slot:append>
            <q-icon v-if="service.personCount" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Days to be Done"
          v-model="service.dayCount"
        >
          <template v-slot:append>
            <q-icon v-if="service.dayCount" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input v-model="service.photo" class="col-12" type="file" @change="uploadPhoto">
          <template v-slot:append>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="value"
              size="30px"
              color="primary"
            />
            <q-icon
              v-if="service.photo !== ''"
              name="close"
              @click="service.photo = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Add Service/Equipment" color="primary" />
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
      value: null,
      service: {
        id: "",
        name: "",
        equipment: "",
        personCount: "",
        dayCount: "",
        available: "true",
        photo: ""
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
    },
    uploadPhoto(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("services/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.value = progress;
          },
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              this.service.photo = downloadURL;
            });
          }
        );
      }
    }
  }
};
</script>

<style>
</style>