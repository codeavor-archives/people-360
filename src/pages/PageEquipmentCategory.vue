<template>
  <q-page padding>
    <equipment-category></equipment-category>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action @click="showAddEquipment = true" color="primary" icon="note_add" />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="showAddEquipment">
      <add-equipment-category @close="showAddEquipment = false"></add-equipment-category>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddEquipment: false
    };
  },
  components: {
    "equipment-category": require("components/Services/EquipmentCategoryTable")
      .default,
    "add-equipment-category": require("components/Services/Modal/AddEquipmentType")
      .default
  }
};
</script>

<style>
</style>