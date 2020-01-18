<template>
  <q-page padding>
    <q-btn align="left" v-go-back.single dense flat color="primary" icon="arrow_back" label="Back" />
    <div class="text-justify">
      <profile></profile>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    profile: require("../components/Profile/Profile").default
  }
};
</script>

<style>
</style>