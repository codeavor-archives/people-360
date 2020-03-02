<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Equipment</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addServices">
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
          type="number"
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Price for old client"
          v-model="service.oldClientPrice"
        >
          <template v-slot:append>
            <q-icon v-if="service.oldClientPrice" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          type="number"
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Price for new client"
          v-model="service.newClientPrice"
        >
          <template v-slot:append>
            <q-icon v-if="service.newClientPrice" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <!-- <q-input
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
        </q-input>-->
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
        <div v-for="(name, index) in checklistarr" :key="index">
          <q-input
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            class="q-pa-xs"
            label="Checklist"
            v-model="name.name"
          >
            <template v-slot:append>
              <q-icon v-if="name.name" name="close" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <q-btn class="q-mt-md" @click="addCheck" round icon="add"></q-btn>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          :disable="!readytosubmit"
          type="submit"
          icon="add"
          label="Add Equipment"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      services: fs.collection("services"),
      equipmentCategories: fs.collection("equipmentCategories")
    };
  },
  data() {
    return {
      checklistarr: [
        {
          name: ""
        }
      ],
      readytosubmit: false,
      optionCategories: [],
      value: null,
      service: {
        id: "",
        type: "",
        equipment: "",
        newClientPrice: "",
        oldClientPrice: "",
        personCount: "",
        dayCount: "",
        available: "true",
        photo: "",
        checklists: ""
      }
    };
  },
  methods: {
    addCheck() {
      this.checklistarr.push({
        checklistarr: {
          name: ""
        }
      });
    },
    getConsole(optionCategories) {
      console.log(optionCategories);
    },
    addServices() {
      this.$q.loading.show();
      this.service.id = fb.auth().currentUser.uid;
      this.checklists = this.checklistarr;
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
              this.readytosubmit = true;
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