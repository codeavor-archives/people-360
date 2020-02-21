<template>
  <q-page padding>
    <special-skill-table v-if="setAdmin"></special-skill-table>
    <q-page-sticky v-if="setAdmin" class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-tooltip content-class="bg-deep-orange">Add Special Skills</q-tooltip>
        <q-fab-action @click="showAddSpecial = true" color="primary" icon="build" />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="showAddSpecial">
      <add-special-skill @close="showAddSpecial = false"></add-special-skill>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddSpecial: false
    };
  },
  components: {
    "special-skill-table": require("components/SpecialSkill/SpecialSkillTable")
      .default,
    "add-special-skill": require("components/SpecialSkill/Modals/AddSpecialSkill")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>