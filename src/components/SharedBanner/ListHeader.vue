<template>
  <q-banner :class="bgcolor" dense inline-actions class="header text-white text-center">
    <span class="text-bold text-subtitle1">
      <slot></slot>
    </span>
  </q-banner>
</template>

<script>
export default {
  props: ["bgcolor"]
};
</script>

<style lang="scss" scoped>
.header {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
</style>