<template>
  <q-page padding>
    <checklist></checklist>
  </q-page>
</template>

<script>
export default {
  components: {
    checklist: require("components/Checklist/ChecklistTable").default
  }
};
</script>

<style>
</style>