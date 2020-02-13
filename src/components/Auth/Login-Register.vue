<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="col text-center">
        <!-- <q-img src="/img/svg/graphics.svg"></q-img> -->
        <q-img src="../../../download.jpg" class="logo"></q-img>
        <!-- <template v-slot:avatar>
          <q-icon v-if="tab == 'login'" name="account_circle" color="primary" />
          <q-icon v-if="tab == 'register'" name="person_add" color="primary" />
        </template>-->
        <!-- {{ tab | titleCase }} -->
      </q-banner>
    </div>
    <q-input
      mask="ASSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
      v-if="tab == 'register'"
      ref="name"
      class="col q-mb-none q-pb-sm"
      v-model="formData.name"
      label="Name"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
    />
    <q-input
      mask="ASSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
      v-if="tab == 'register'"
      ref="middleName"
      class="col q-mb-none q-pb-sm"
      v-model="formData.middleName"
      label="Middle Name"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
    />

    <q-input
      mask="ASSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
      v-if="tab == 'register'"
      ref="lastName"
      class="col q-mb-none q-pb-sm"
      v-model="formData.lastName"
      label="Last Name"
    />

    <q-input
      v-if="tab == 'register'"
      ref="companyName"
      class="col q-mb-none q-pb-sm"
      v-model="formData.companyName"
      label="Company Name"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
    />
    <q-input
      v-if="tab == 'register'"
      ref="phoneNumber"
      class="col q-mb-none q-pb-sm"
      v-model="formData.phoneNumber"
      label="Phone Number"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
      mask="(+63)-###-###-####"
      hint="PH:(+63)-912-345-6789"
    />

    <q-input
      v-if="tab == 'register'"
      ref="companyLocation"
      class="col q-mb-none q-pb-sm"
      v-model="formData.location"
      label="Company Location"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
    />
    <q-input
      type="email"
      ref="email"
      :rules="[
        val => isValidEmailAddress(val) || 'Please enter a valid email address'
      ]"
      lazy-rules
      class="col q-mb-none q-pb-sm"
      v-model="formData.email"
      label="Email"
    />
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
    <div class="row q-mb-md">
      <q-btn @click="resetPassword" dense flat color="primary" label="Reset Password" />
      <q-space></q-space>
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
import { fb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { showSuccessMessage } from "src/functions/function-show-success-message";
export default {
  props: ["tab"],
  data() {
    return {
      isPwd: true,
      isconfPwd: true,
      formData: {
        name: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        location: ""
      }
    };
  },
  methods: {
    resetPassword() {
      this.$q.loading.show({
        delay: 400
      });
      var auth = fb.auth();
      var emailAddress = this.formData.email;
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(response => {
          this.$q.loading.hide();
          this.$q
            .dialog({
              title: "Success",
              message: "Reset Password send to email",
              persistent: true
            })
            .onOk(() => {});
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.$refs.name.validate();
          this.$refs.lastName.validate();
          if (!this.$refs.name.hasError && !this.$refs.lastName.hasError) {
            this.registerUser(this.formData);
          }
        }
      }
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isValidaName(name) {
      var letters = /^[A-Za-z]+$/;
      if (name.value.match(letters)) {
        return name;
      } else {
        return name;
      }
    },
    ...mapActions("auth", ["registerUser", "loginUser"])
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style>
.logo {
  height: 130px;
  width: 150px;
  max-width: 300px;
}
</style>
