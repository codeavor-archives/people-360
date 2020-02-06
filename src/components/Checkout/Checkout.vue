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
        <q-form @submit.prevent="requestProposal">
          <q-card flat class="my-card bg-white text-primary">
            <q-card-section>
              <div class="text-h6">Pre Proposal Checklist</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>
            <q-card-section class>
              <q-input
                style="display: none"
                disable
                class="col q-mb-sm"
                v-model="preproposal.date"
                label="Date"
              ></q-input>
              <q-input
                style="display: none"
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
            <span>
              No items on cart
              <q-spinner-cube size="1em" color="primary" />
            </span>
          </template>
        </q-banner>
      </transition>
    </template>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  data() {
    return {
      request: [],
      preproposal: {
        date: "",
        proposalNumber: [],
        companyName: "",
        location: "",
        optionReport: "",
        quantity: [],
        equipment: [],
        name: []
      },
      stars: "",
      optionsReport: ["Yes", "No"]
    };
  },
  methods: {
    removeToCart(item) {
      this.$store.commit("storeservices/removeItemFromCart", item);
    },
    requestProposal() {
      var today = new Date();
      var year = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      this.preproposal.date = today;
      year = mm;
      this.preproposal.proposalNumber =
        "RN" +
        "-" +
        "IN" +
        "-" +
        Math.floor(Math.random() * 1000000000 + 1) +
        "-" +
        year;
      // Add to Request Proposals
      // this.$q.loading.show();
      let data = this.cart.map(item => ({
        quantity: item.service_quantity
      }));
      data = Object.assign({}, ...data);
      let data2 = this.cart.map(item => ({
        price: item.service_price
      }));
      data2 = Object.assign({}, ...data2);
      let data3 = this.cart.map(item => ({
        equipment: item.service_equipment
      }));
      data3 = Object.assign({}, ...data3);
      let data4 = this.cart.map(item => ({
        name: item.service_name
      }));
      data4 = Object.assign({}, ...data4);
      this.preproposal.id = fb.auth().currentUser.uid;
      this.preproposal.quantity = data;
      this.preproposal.service_price = data2;
      this.preproposal.equipment = data3;
      this.preproposal.name = data4;
      if (this.preproposal.optionReport === "Yes") {
        this.preproposal.optionReport = true;
      }
      // console.log(data, data2, data3, data4);
      this.$firestore.preproposals
        .add(this.preproposal)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Success",
            message: "Please wait for appointment",
            persistent: true
          });
          this.$store.commit("storeservices/removeItemFromCart", this.cart);
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
    }
  },
  computed: {
    ...mapState("storeservices", ["cart"]),
    ...mapGetters("storeservices", ["totalPrice"])
  }
};
</script>

<style></style>
