<template>
  <div class="row">
    <q-input
      @input="$emit('update:name', $event)"
      autofocus
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      class="col"
      :value="name"
      label="Task Name"
      v-select-all
    >
      <template v-slot:append>
        <q-icon v-if="name" name="close" @click="$emit('update:name', '')" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";
export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>

<style lang="scss" scoped>
</style>