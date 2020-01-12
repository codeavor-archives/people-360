<template>
  <div class="row q-mb-sm">
    <q-input @input="$emit('update:duedate', $event)" label="Due date" outlined :value="duedate">
      <template v-slot:append>
        <q-icon v-if="duedate" name="close" @click="$emit('clear')" class="cursor-pointer" />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="duedate" @input="$emit('update:duedate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["duedate"]
};
</script>

<style>
</style>