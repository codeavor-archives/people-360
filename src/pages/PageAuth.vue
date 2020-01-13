<template>
  <q-page padding class="login-register">
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "login"
    };
  },
  components: {
    "login-register": require("components/Auth/Login-Register.vue").default
  }
};
</script>

<style>
.auth-tabs {
  max-width: 480px;
  margin: 0 auto;
}
.login-register {
  margin-top: 50px;
}
</style>