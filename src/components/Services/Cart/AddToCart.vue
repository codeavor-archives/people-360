<template>
  <div>
    <q-btn
      @click="addToCart(service)"
      round
      color="primary"
      icon="add_shopping_cart"
      class="absolute"
      style="top: 0; right: 12px; transform: translateY(-50%);"
    />
    <q-dialog v-model="showReservationModal">
      <reservation-modal @close="showReservationModal=false" :services="services"></reservation-modal>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    serviceId: String,
    serviceName: String,
    servicePrice: String,
    servicePhoto: String,
    serviceEquipment: String,
    servicePersonCount: String,
    servicedayCount: String
  },
  data() {
    return {
      services: {},
      showReservationModal: false,
      service: {
        serviceID: this.serviceId,
        serviceName: this.serviceName,
        servicePrice: this.servicePrice,
        servicePhoto: this.servicePhoto,
        serviceEquipment: this.serviceEquipment,
        servicePersonCount: this.servicePersonCount,
        serviceDayCount: this.servicedayCount,
        serviceQuantity: 1
      }
    };
  },
  methods: {
    addToCart(service) {
      // console.log(service);
      this.services = service;
      this.showReservationModal = true;
      // this.$store.commit("storeservices/addToCart", this.service);
      // console.log(this.service.service_price);
      // console.log(this.service);
    }
  },
  components: {
    "reservation-modal": require("components/Services/Cart/ReservationModal")
      .default
  }
};
</script>

<style>
</style>