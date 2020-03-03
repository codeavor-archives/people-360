<template>
  <q-page padding>
    <print-certificate></print-certificate>
  </q-page>
</template>

<script>
export default {
  components: {
    "print-certificate": require("components/Certificates/PrintCertificateTable")
      .default
  }
};
</script>

<style>
</style>