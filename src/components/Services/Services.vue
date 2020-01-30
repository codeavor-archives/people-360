<template>
  <div class="row items-start">
    <div v-for="service in services" :key="service.key" class="col-md-3 col-lg-3 col-xs-6 col-sm-6">
      <q-card class="q-ma-xs">
        <q-img :src="service.photo" />
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">Cafe Basilico</div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div
            class="text-caption text-grey"
          >Small plates, salads & sandwiches in an intimate setting.</div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">Reserve</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      services: fs.collection("services")
    };
  },
  data() {
    return {
      stars: 4
    };
  }
};
</script>

<style lang="scss" scoped>
</style>