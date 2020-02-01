<template>
  <q-page>
    <div class="text-subtitle2">
      <q-list>
        <q-item v-for="item in cart" :key="item.id">
          <q-item-section top avatar>
            <q-avatar>
              <img :src="item.service_photo" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.service_name}}</q-item-label>
            <q-item-label caption>{{item.service_equipment}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge>₱ {{item.service_price}}</q-badge>
            <q-item-label caption>Qty: {{item.service_quantity}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-separator />
    <q-card-actions align="right" class="q-pr-md">
      <q-item-label class="text-grey-8">Total: ₱ {{totalPrice}}</q-item-label>
    </q-card-actions>
    <div class="q-mt-md">
      <q-card flat class="my-card bg-white text-primary">
        <q-card-section>
          <div class="text-h6">Make a Registration</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>
        <q-card-section>
          <q-input
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            class="col"
            label="Equipment/Service Name"
          >
            <template v-slot:append>
              <q-icon name="close" class="cursor-pointer" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions>
          <q-space></q-space>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      stars: ""
    };
  },
  computed: {
    ...mapState("storeservices", ["cart"]),
    ...mapGetters("storeservices", ["totalPrice"])
  }
};
</script>

<style>
</style>