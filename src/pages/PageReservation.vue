<template>
  <q-page padding>
    <!-- <Calendar></Calendar> -->
    <FullCalendar></FullCalendar>

    <!-- <services v-else></services> -->
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Calendar: require("components/Calendar/Calendar").default,
    FullCalendar: require("components/Calendar/FullCalendar").default,
    services: require("components/Services/Services").default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),
    ...mapState("storeevents", ["eventDownloaded"])
  }
};
</script>

<style></style>
