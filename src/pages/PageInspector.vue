<template>
  <q-page padding>
    <inspector-table></inspector-table>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action
          @click="showAddPosition = true"
          color="primary"
          icon="build"
        />
        <!-- <q-fab-action @click="onClick" color="primary" icon="mail" /> -->
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddPosition">
      <add-inspector-position
        @close="showAddPosition = false"
      ></add-inspector-position>
    </q-dialog>
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
    "inspector-table": require("components/Inspector/InspectorTable").default,
    "add-inspector-position": require("components/Inspector/Modal/AddInspectorPosition")
      .default
  }
};
</script>

<style></style>
