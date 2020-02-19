<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add as Inspector</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addToInspector">
      <q-card-section class="addusers">
        <q-input
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
          ref="name"
          class="col q-mb-none q-pb-sm"
          v-model="formData.name"
          label="Name"
        />
        <q-input
          type="email"
          ref="email"
          :rules="[
              val =>
                isValidEmailAddress(val) || 'Please enter a valid email address'
            ]"
          lazy-rules
          class="col q-mb-none q-pb-sm"
          v-model="formData.email"
          label="Email"
        />
        <q-select
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
          ref="role"
          class="col q-mb-none q-pb-sm"
          v-model="formData.roles"
          label="Role"
          :options="optionRole"
        />
        <q-select
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
          v-model="formData.position"
          class="col q-mb-none q-pb-sm"
          :options="options"
          label="Inspector Position"
        ></q-select>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Add to Inspector" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import { db, fb, fc, fs } from "boot/firebase";
import { uid } from "quasar";
export default {
  props: ["user", "id"],
  firestore() {
    return {
      inspectors: fs.collection("inspectors"),
      positions: fs.collection("positions")
    };
  },
  data() {
    return {
      optionRole: ["new", "old", "Inspector"],
      options: [],
      isPwd: true,
      formData: {
        position: ""
      }
    };
  },
  methods: {
    ...mapActions("storeusers", ["updateUser"]),
    addToInspector() {
      this.$q.loading.show();
      this.formData.id = this.id;
      this.formData.roles = "Inspector";
      this.updateUser({
        id: this.id,
        userDetails: this.formData
      });

      this.$firestore.inspectors
        .doc(this.id)
        .set({
          id: this.id,
          name: this.formData.name,
          email: this.formData.email,
          position: this.formData.position,
          label: this.formData.email,
          value: this.formData.email,
          available: true
        })
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
        });
      this.$emit("close");
    },
    makeAdmin() {
      this.$q.loading.show();
      // =====================================================
      // // This is working na
      const addAdminRole = fc.httpsCallable("addAdminRole");
      addAdminRole({ email: this.user.email }).then(result => {
        console.log(result);
        this.$q.loading.hide();
      });
      // console.log(this.id)
      // ============================
    },
    editUser() {
      // var updates = db.ref("users/" + this.id).update(this.formData);
      // return db.ref().update(updates);
      this.updateUser({
        id: this.id,
        userDetails: this.formData
      });
      this.$emit("close");
    },
    newPassword() {
      const newPassword = fc.httpsCallable("newPassword");
      newPassword({ email: this.user.email }).then(result => {
        console.log(result);
      });
      this.$emit("close");
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  mounted() {
    this.formData = Object.assign({}, this.user);

    let options = [];
    let positionRef = fs.collection("positions");
    let allPostion = positionRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          options.push(doc.data().positionName);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    this.options = options;
  }
};
</script>
<style lang="scss" scoped></style>
