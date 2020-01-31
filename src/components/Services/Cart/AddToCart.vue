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
export default {
  props: {
    id: String,
    serviceName: String,
    serviceprice: String,
    servicePhoto: String,
    serviceEquipment: String,
    servicePersonCount: String,
    servicedayCount: String
  },
  data() {
    return {
      service: {
        service_name: this.serviceName,
        service_price: this.serviceprice,
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
      this.$storeservices.commit("addToCart", this.service);
    }
  }
};
</script>

<style>
</style>