<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Certificate Builder</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addCertificate">
      <q-card-section>
        <q-input v-model="certificate.logo" class="col-12" type="file" @change="uploadLogo">
          <template v-slot:append>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="value"
              size="30px"
              color="primary"
            />
            <q-icon
              v-if="certificate.logo !== ''"
              name="close"
              @click="certificate.logo = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Director Signatory"
          v-model="certificate.director"
        >
          <template v-slot:append>
            <q-icon v-if="certificate.director" name="close" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          :disable="!readytosubmit"
          type="submit"
          icon="add"
          label="Add Certificate Builder"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      certificates: fs.collection("certificates")
    };
  },
  data() {
    return {
      readytosubmit: false,
      value: null,
      certificate: {
        logo: "",
        director: ""
      }
    };
  },
  methods: {
    uploadLogo(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("certificate/" + Math.random() + "_" + file.name);
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
              this.certificate.logo = downloadURL;
              this.readytosubmit = true;
            });
          }
        );
      }
    },
    addCertificate() {
      this.$q.loading.show();
      this.certificate.id = fb.auth().currentUser.uid;
      this.$firestore.certificates
        .add(this.certificate)
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