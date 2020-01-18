<template>
  <div class="row">
    <q-input
      :rules="[val => !!val || 'Field is required']"
      @input="$emit('update:duetime', $event)"
      class="col"
      label="Due time"
      :value="duetime"
    >
      <template v-slot:append>
        <q-icon
          v-if="duetime"
          name="close"
          @click="$emit('update:duetime', '')"
          class="cursor-pointer"
        />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time @input="$emit('update:duetime', $event)" :value="duetime" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["duetime"]
};
</script>

<style>
</style>