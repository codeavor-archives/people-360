<template>
  <q-btn
    @click="addToCart()"
    round
    color="primary"
    icon="add_shopping_cart"
    class="absolute"
    style="top: 0; right: 12px; transform: translateY(-50%);"
  />
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
    addToCart() {
      this.$store.commit("storeservices/addToCart", this.service);
      // console.log(this.service.service_price);
      // console.log(this.service);
    }
  }
};
</script>

<style>
</style>