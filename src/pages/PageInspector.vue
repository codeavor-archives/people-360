<template>
  <q-page padding>
    <inspector-table></inspector-table>
  </q-page>
</template>

<script>
export default {
  components: {
    "inspector-table": require("components/Inspector/InspectorTable").default
  }
};
</script>

<style>
</style>