<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Users</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addUser()">
      <q-card-section class="addusers">
        <div class="row q-mb-md">
          <q-input ref="name" class="col" v-model="formData.name" label="Name" />
        </div>
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
            v-model="formData.email"
            label="Email"
          />
        </div>
        <div class="row q-mb-md">
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
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn icon="save" style="width: 100px" type="submit" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import { uid } from "quasar";
export default {
  data() {
    return {
      isPwd: true,
      formData: {
        id: uid(),
        name: "",
        email: "",
        password: "",
        online: false
      }
    };
  },
  methods: {
    ...mapActions("users", ["fbAddUser"]),
    addUser() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.fbAddUser(this.formData);
      }
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>
<style lang="scss" scoped>
</style>