<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit User</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form>
      <q-card-section class="addusers">
        <div class="row q-mb-md">
          <q-input ref="name" class="col" v-model="user.name" label="Name" />
        </div>
        <!-- <div class="row q-mb-md">
          <q-input ref="role" class="col" v-model="user.roles" label="Role" />
        </div> -->
        <div class="row q-mb-xs">
          <q-input
            type="email"
            ref="email"
            :rules="[
              val =>
                isValidEmailAddress(val) || 'Please enter a valid email address'
            ]"
            lazy-rules
            class="col"
            v-model="user.email"
            label="Email"
          />
        </div>
        <!-- <div class="row q-mb-md">
          <q-input
            ref="password"
            label="Password"
            class="col"
            v-model="formData.password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[val => val.length >= 6 || 'Please enter atleast 6 characters']"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>-->
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          @click="newPassword"
          icon="save"
          label="Reset Password"
          color="primary"
        /><q-btn
          @click="editUser"
          icon="save"
          label="Set as Admin"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import { db, fb, fc } from "boot/firebase";
import { uid } from "quasar";
export default {
  props: ["user"],
  data() {
    return {
      isPwd: true,
      formData: {
        // id: uid(),
        // name: "",
        // email: "",
        // password: "",
        // online: false
      }
    };
  },
  methods: {
    ...mapActions("storeusers", ["updateUser"]),
    editUser() {
      // this.$refs.taskname.$refs.name.validate();
      // if (!this.$refs.taskname.$refs.name.hasError) {
      // this.updateUser({
      //   id: this.$route.params.id,
      //   userDetails: this.formData
      // });
      // }
      // console.log(this.user.id);
      // db.ref("users/" + payload.userID).update(payload.updates, error => {
      //   if (error) {
      //     showErrorMessage(error.message);
      //   }
      // });
      // db.ref("users/" + this.user).update(this.user);
      // console.log(this.user.email);
      const addAdminRole = fc.httpsCallable("addAdminRole");
      addAdminRole({ email: this.user.email }).then(result => {
        console.log(result);
      });
    },
    newPassword() {
      const newPassword = fc.httpsCallable("newPassword");
      newPassword({ email: this.user.email }).then(result => {
        console.log(result);
      });
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  mounted() {
    // this.formData = Object.assign({}, this.user);
  }
};
</script>
<style lang="scss" scoped></style>
