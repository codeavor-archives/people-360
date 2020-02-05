<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Services</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="fbEditServices">
      <q-card-section class="addusers">
        <q-select
          :rules="[val => !!val || 'Field is required']"
          v-model="service.type"
          class="col"
          label="Equipment Type"
          :options="optionCategories"
        >
          <template v-slot:append>
            <q-icon v-if="service.type" name="close" class="cursor-pointer" />
          </template>
        </q-select>
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
          label="Price"
          v-model="service.price"
        >
          <template v-slot:append>
            <q-icon v-if="service.price" name="close" class="cursor-pointer" />
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
        <q-btn type="submit" icon="save" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["service", "id"],
  firestore() {
    return {
      services: fs.collection("services"),
      equipmentCategories: fs.collection("equipmentCategories")
    };
  },
  data() {
    return {
      optionCategories: [],
      value: null
    };
  },
  methods: {
    fbEditServices() {
      this.$q.loading.show();
      this.service.id = fb.auth().currentUser.uid;
      this.$firestore.services
        .doc(this.id)
        .update(this.service)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.showEditServices = false;
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
          this.showEditServices = false;
        });
      this.$emit("close");
      this.readytosubmit = false;
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
  },
  mounted() {
    let options = [];
    let categoryRef = fs.collection("equipmentCategories");
    let allCategory = categoryRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          options.push(doc.data().type);
          // console.log(Object.values(doc));
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    this.optionCategories = options;
  }
};
</script>

<style>
</style>