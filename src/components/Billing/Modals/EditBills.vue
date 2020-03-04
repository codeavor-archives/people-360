<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row">
      <div style="font-size: 11px;" class="col-3 text-justify">
        <div class="text-h6">People 360</div>People360 Bldg, 1141 Epifanio de los Santos Ave, Balintawak, Quezon City, 1106 Metro Manila
      </div>
      <q-space></q-space>
      <div class="text-center" v-for="logo in certificates" :key="logo.id">
        <img :src="logo.logo" width="110px" />
      </div>
      <q-space></q-space>
      <div class="col-3 text-justify"></div>
      <!-- <q-space></q-space> -->
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section class="row">
      <div class="col-3 text-justify"></div>
      <q-space></q-space>
      <div class="col-3 text-justify">
        <div style="font-size: 14px;">
          <strong>INVOICE NO.</strong>
        </div>
      </div>
    </q-card-section>
    <q-form @submit.prevent="editPayment">
      <q-card-section>
        Balance: {{bill.balance}}
        <div class="row">
          <q-input
            type="number"
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            class="col"
            label="Payment"
            v-model="bill.payment"
          >
            <template v-slot:append>
              <q-icon v-if="bill.payment" name="close" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Close" v-close-popup icon="close" />
        <q-btn type="submit" icon="save" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  props: ["bill"],
  firestore() {
    return {
      billings: fs.collection("billings"),
      preproposals: fs.collection("preproposals"),
      certificates: fs.collection("certificates")
    };
  },
  methods: {
    editPayment() {
      console.log(this.bill);
    }
  }
};
</script>

<style>
</style>