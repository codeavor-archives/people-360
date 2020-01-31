<template>
  <div class="row items-start">
    <div
      v-for="service in services"
      :key="service.key"
      class="col-md-3 col-xl-2 col-lg-2 col-xs-6 col-sm-6"
    >
      <q-card class="q-ma-xs">
        <q-img :src="service.photo" />
        <q-card-section>
          <!-- <add-to-cart></add-to-cart>  -->
          <add-to-cart
            :id="service.id"
            :serviceName="service.name"
            :serviceprice="service.price"
            :servicePhoto="service.photo"
            :serviceEquipment="service.equipment"
            :servicePersonCount="service.personCount"
            :servicedayCount="service.dayCount"
          ></add-to-cart>
          <!-- <add-to-cart></add-to-cart> -->

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{service.name}}</div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              {{service.personCount}}
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="15px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">$ {{service.dayCount}}</div>
          <div class="text-caption text-grey">{{service.equipment}}</div>
        </q-card-section>

        <!-- <q-separator /> -->

        <!-- <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">Reserve</q-btn>
        </q-card-actions>-->
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
  },
  components: {
    "add-to-cart": require("components/Services/Cart/AddToCart").default
  }
};
</script>

<style lang="scss" scoped>
</style>