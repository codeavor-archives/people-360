<template>
  <q-input
    v-select-all
    @keyup.esc="searchField = ''"
    class="col"
    outlined
    label="Search"
    v-model="searchField"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("storetasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions("storetasks", ["setSearch"])
  },
  directives: {
    selectAll
  }
};
</script>

<style>
</style>