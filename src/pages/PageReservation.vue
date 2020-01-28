<template>
  <q-page padding>
    <!-- <Calendar></Calendar> -->
    <FullCalendar></FullCalendar>
  </q-page>
</template>

<script>
export default {
  components: {
    Calendar: require("components/Calendar/Calendar").default,
    FullCalendar: require("components/Calendar/FullCalendar").default
  }
};
</script>

<style></style>
