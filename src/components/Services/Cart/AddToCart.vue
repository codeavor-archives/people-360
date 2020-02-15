<template>
  <div>
    <q-btn
      @click="addToCart(service)"
      round
      color="primary"
      icon="add_shopping_cart"
      class="absolute"
      style="top: 0; right: 12px; transform: translateY(-50%);"
    >
      <q-tooltip content-class="bg-deep-orange">Add to Cart</q-tooltip>
    </q-btn>
    <!-- <q-dialog v-model="showReservationModal"> -->
    <!-- <reservation-modal @close="showReservationModal=false" :services="services"></reservation-modal> -->
    <!-- </q-dialog> -->
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
        service_Id: this.serviceId,
        service_name: this.serviceName,
        service_price: this.servicePrice,
        service_photo: this.servicePhoto,
        service_equipment: this.serviceEquipment,
        service_personCount: this.servicePersonCount,
        service_dayCount: this.servicedayCount,
        service_quantity: 1
      }
    };
  },
  methods: {
    addToCart(service) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you add this on cart?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log(service);
          this.services = service;
          // this.showReservationModal = true;
          this.$store.commit("storeservices/addToCart", this.service);
          // console.log(this.service.service_price);
          // console.log(this.service);
        });
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