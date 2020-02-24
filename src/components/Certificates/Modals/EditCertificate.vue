<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Certificate Builder</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="editCertificate">
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
        <q-btn type="submit" icon="edit" label="Edit Certificate" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["certificate"],
  firestore() {
    return {
      certificates: fs.collection("certificates")
    };
  },
  data() {
    return {
      readytosubmit: false,
      value: null
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
    editCertificate() {
      this.$q.loading.show();
      this.certificate.id = fb.auth().currentUser.uid;
      this.$firestore.certificates
        .doc(this.certificate.id)
        .update(this.certificate)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>