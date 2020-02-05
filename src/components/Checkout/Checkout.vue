<template>
  <q-page>
    <template v-if="cart.length">
      <div class="text-subtitle2">
        <q-list>
          <q-item v-for="item in cart" :key="item.id">
            <q-item-section top avatar>
              <q-avatar>
                <img :src="item.service_photo" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.service_name }}</q-item-label>
              <q-item-label caption>{{ item.service_equipment }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-badge>
                {{
                item.service_price | currency("₱", 2, { decimalSeparator: "." })
                }}
              </q-badge>
              <q-item-label caption>Qty: {{ item.service_quantity }}</q-item-label>
              <q-btn dense round size="8px" @click="removeToCart(item)" icon="clear" flat></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-separator />
      <q-card-actions align="right" class="q-pr-md">
        <q-item-label class="text-grey-8">
          Total:
          {{
          totalPrice | currency("₱", 2, { decimalSeparator: "." })
          }}
        </q-item-label>
      </q-card-actions>
      <div class="q-mt-md">
        <q-form @submit.prevent="save">
          <q-card flat class="my-card bg-white text-primary">
            <q-card-section>
              <div class="text-h6">Pre Proposal Checklist</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>
            <q-card-section class>
              <q-input disable class="col q-mb-sm" v-model="preproposal.date" label="Date"></q-input>
              <q-input
                disable
                class="col q-mb-sm"
                v-model="preproposal.proposalNumber"
                label="Proposal Number"
              ></q-input>
              <q-input
                v-model="preproposal.companyName"
                ref="name"
                class="col q-mb-none q-pb-sm"
                :rules="[val => !!val || 'Field is required']"
                label="Company Name"
              ></q-input>
              <q-input
                v-model="preproposal.location"
                :rules="[val => !!val || 'Field is required']"
                ref="name"
                class="col q-mb-none q-pb-sm"
                label="Location(Area)"
              ></q-input>
              <q-select
                :rules="[val => !!val || 'Field is required']"
                class="col"
                :options="optionsReport"
                v-model="preproposal.optionReport"
                label="With Report?"
              ></q-select>
            </q-card-section>
            <q-card-actions>
              <q-space></q-space>
              <q-btn type="submit" color="primary" label="Submit"></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
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
            <q-spinner-hourglass color="primary" size="4em" />
            <span>No item on cart</span>
          </template>
        </q-banner>
      </transition>
    </template>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      preproposal: {
        date: "",
        price: "",
        companyName: "",
        proposalNumber: "",
        location: "",
        optionReport: ""
      },
      stars: "",
      optionsReport: ["Yes", "No"]
    };
  },
  methods: {
    removeToCart(item) {
      this.$store.commit("storeservices/removeItemFromCart", item);
    },
    save() {
      var today = new Date();
      var year = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      this.preproposal.date = today;
      year = mm;

      this.preproposal.proposalNumber =
        "PR" +
        "-" +
        "IN" +
        "-" +
        Math.floor(Math.random() * 1000000000 + 1) +
        "-" +
        year;
    }
  },
  computed: {
    ...mapState("storeservices", ["cart"]),
    ...mapGetters("storeservices", ["totalPrice"])
  }
};
</script>

<style></style>
