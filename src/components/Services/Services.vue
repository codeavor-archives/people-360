<template>
  <q-page>
    <template v-if="services.length">
      <div class="row items-start">
        <div
          v-for="service in services"
          :key="service.key"
          class="col-md-3 col-xl-2 col-lg-2 col-xs-6 col-sm-4"
        >
          <q-card class="q-ma-xs">
            <q-img :src="service.photo" />
            <q-card-section>
              <!-- <add-to-cart></add-to-cart>  -->
              <add-to-cart
                :serviceId="service.id"
                :serviceName="service.type"
                :servicePrice="service.price"
                :servicePhoto="service.photo"
                :serviceEquipment="service.equipment"
                :servicePersonCount="service.personCount"
                :servicedayCount="service.dayCount"
              ></add-to-cart>
              <!-- <add-to-cart></add-to-cart> -->

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">{{service.type}}</div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="place" />
                  {{service.personCount}}
                </div>
              </div>
              <div class="row">
                <q-rating v-model="stars" :max="5" size="15px" />
                <q-space></q-space>
                <q-btn
                  @click="showDetailsModal(service)"
                  flat
                  color="primary"
                  round
                  icon="remove_red_eye"
                  size="10px"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">₱ {{service.price}}</div>
              <div class="text-caption text-grey">{{service.equipment}}</div>
            </q-card-section>

            <!-- <q-separator /> -->

            <!-- <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">Reserve</q-btn>
            </q-card-actions>-->
          </q-card>
        </div>
        <q-dialog v-model="showDetails">
          <show-details @close="showDetails = false" :service="service" :id="id"></show-details>
        </q-dialog>
      </div>
    </template>
    <template v-else>
      <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
      >
        <q-banner class="fixed-center">
          <template v-slot:avatar class="absolute">
            <span>
              Please wait
              <q-spinner-dots size="1em" color="primary" />
              <q-spinner-hourglass size="2em" color="primary" />
            </span>
          </template>
        </q-banner>
      </transition>
    </template>
  </q-page>
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
      stars: 4,
      showDetails: false,
      id: "",
      service: {}
    };
  },
  methods: {
    showDetailsModal(service) {
      this.showDetails = true;
      this.service = service;
      this.id = service.id;
      console.log(service.id);
    }
  },
  components: {
    "add-to-cart": require("components/Services/Cart/AddToCart").default,
    "show-details": require("components/Services/Modal/ShowDetails").default
  }
};
</script>

<style lang="scss" scoped>
</style>