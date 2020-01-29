<template>
  <q-page padding="">
    <inspector-position-table></inspector-position-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddPosition: false
    };
  },
  components: {
    "inspector-position-table": require("components/Inspector/InspectorPositionTable")
      .default,
    "add-inspector-position": require("components/Inspector/Modal/AddInspectorPosition")
      .default
  }
};
</script>

<style></style>
