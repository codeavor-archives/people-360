<template>
  <q-page>
    <!-- <template v-if="cart.length"> -->
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
      <q-badge color="red">Note: Please review items before to submit</q-badge>
      <q-space></q-space>
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
          <!-- <FullCalendar
              :plugins="calendarPlugins"
              :header="{
          left: 'next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }"
              @select="handleSelect"
              selectable="true"
              :events="clientReservation"
              @eventClick="handleClick"
              defaultView="dayGridMonth"
              ref="fullCalendar"
              :event-color="getEventColor"
              :now="today"
              :view="type"
              :type="type"
              :title="title"
              v-model="date"
              :hiddenDays="hiddenDays"
              :weekends="calendarWeekends"
          />-->
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
              v-model="preproposal.start"
              :rules="[val => !!val || 'Field is required']"
              class="col q-mb-none q-pb-sm"
              label="Start Date"
            >
              <template v-slot:append>
                <q-icon v-if="preproposal.start" name="close" class="cursor-pointer" />
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date mask="YYYY-MM-DD" landscape v-model="preproposal.start" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- <q-input
              v-model="preproposal.end"
              :rules="[val => !!val || 'Field is required']"
              class="col q-mb-none q-pb-sm"
              label="End Date"
            >
              <template v-slot:append>
                <q-icon v-if="preproposal.end" name="close" class="cursor-pointer" />
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date mask="YYYY-MM-DD" landscape v-model="preproposal.end" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>-->
            <!-- <q-input
              v-model="preproposal.companyName"
              ref="name"
              class="col q-mb-none q-pb-sm"
              :rules="[val => !!val || 'Field is required']"
              label="Company Name"
            ></q-input>-->
            <!-- <q-input
              v-model="preproposal.location"
              :rules="[val => !!val || 'Field is required']"
              ref="name"
              class="col q-mb-none q-pb-sm"
              label="Location(Area)"
            ></q-input>-->
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
            <q-btn type="submit" :disable="!cart.length" color="primary" label="Submit"></q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
    <!-- </template> -->
    <!-- <template v-else>
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
    </template>-->
    <q-dialog v-model="medium">
      <add-event :start="start" :end="end" @close="medium = false"></add-event>
    </q-dialog>

    <q-dialog v-model="showEditEvent">
      <edit-event
        :title="event.title"
        :details="event.details"
        :start="event.start"
        :end="event.end"
        :id="event.id"
        :color="event.color"
        @close="showEditEvent = false"
      ></edit-event>
    </q-dialog>
  </q-page>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

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
      start: "",
      end: "",
      medium: false,
      showEditEvent: false,
      date: "",
      hiddenDays: [0],
      clientReservation: {},
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin
      ],
      title: null,
      type: "month",
      calendarWeekends: true,
      today: new Date().toISOString().substr(0, 10),
      request: [],
      preproposal: {
        allDay: "true",
        color: "#027be3",
        start: "",
        end: "",
        title: "",
        date: "",
        totalPrice: "",
        proposalNumber: [],
        companyName: "",
        location: "",
        optionReport: "",
        status: "",
        itemPurchase: []
        // quantity: [],
        // equipment: [],
        // name: []
      },
      stars: "",
      optionsReport: ["Yes", "No"],
      event: {
        title: "",
        details: "",
        start: "",
        end: "",
        color: "",
        id: ""
      }
    };
  },
  methods: {
    handleSelect(arg) {
      this.medium = true;
      this.start = arg.startStr;
      this.end = arg.endStr;
    },
    handleClick(arg) {
      // console.log(arg.);
      this.showEditEvent = true;
      console.log(arg);
      this.event.title = arg.event.title;
      this.event.details = arg.event.extendedProps.details;
      this.event.id = arg.event.id;
      this.event.color = arg.event.borderColor;
      // this.event.start = arg.event.start.getDay();
      let year = arg.event.start.getFullYear();
      let month = arg.event.start.getDay();
      let day = arg.event.start.getDate();

      this.event.start = year + "-" + month + "-" + day;

      let yearend = arg.event.end.getFullYear();
      let monthend = arg.event.end.getMonth();
      let dayend = arg.event.end.getDay();

      this.event.end = yearend + "-" + monthend + "-" + dayend;
    },
    getEventColor(ev) {
      return ev.color;
    },
    removeToCart(item) {
      this.$store.commit("storeservices/removeItemFromCart", item);
    },
    clear() {
      this.preproposal.start = "";
      this.preproposal.end = "";
      this.preproposal.title = "";
      this.preproposal.date = "";
      this.preproposal.proposalNumber = "";
      this.preproposal.companyName = "";
      this.preproposal.location = "";
      this.preproposal.optionReport = "";
      this.preproposal.quantity = "";
      this.preproposal.equipment = "";
      this.preproposal.name = "";
      this.preproposal.status = "";
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
        "PN" +
        "-" +
        "IN" +
        "-" +
        Math.floor(Math.random() * 1000000000 + 1) +
        "-" +
        year;
      // Add to Request Proposals
      this.$q.loading.show();
      let data = this.cart.map(item => ({
        [item.service_Id]: item.service_quantity
      }));
      data = Object.assign({}, ...data);
      let data2 = this.cart.map(item => ({
        [item.service_Id]: item.service_price
      }));
      data2 = Object.assign({}, ...data2);
      let data3 = this.cart.map(item => ({
        [item.service_Id]: item.service_equipment
      }));
      data3 = Object.assign({}, ...data3);
      let data4 = this.cart.map(item => ({
        [item.service_Id]: item.service_name
      }));
      data4 = Object.assign({}, ...data4);

      // let data = this.cart.map(item => [item.service_quantity]);
      // let data2 = this.cart.map(item => [item.service_price]);
      // let data3 = this.cart.map(item => [item.service_equipment]);
      // let data4 = this.cart.map(item => [item.service_name]);
      this.preproposal.id = fb.auth().currentUser.uid;
      this.preproposal.location = this.userDetails.companyLocation;

      // this.preproposal.quantity = data;
      // this.preproposal.service_price = data2;
      // this.preproposal.equipment = data3;
      // this.preproposal.name = data4;
      this.preproposal.itemPurchase = this.cart;
      this.preproposal.companyName = this.userDetails.companyName;
      if (this.userDetails.roles == "new") {
        this.preproposal.status = false;
      } else {
        this.preproposal.status = true;
      }

      if (this.preproposal.optionReport === "Yes") {
        this.preproposal.optionReport = true;
      }
      // console.log(data, data2, data3, data4);
      this.preproposal.totalPrice = this.totalPrice;
      this.preproposal.title =
        this.preproposal.companyName + " " + this.preproposal.location;
      this.$firestore.preproposals
        .add(this.preproposal)
        .then(response => {
          this.clear();
          console.log(response);
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Success",
            message: "Please wait for confirmation",
            persistent: true
          });
          this.$store.commit("storeservices/removeItemFromCart", this.cart);
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
      this.$store.commit("storeservices/removeItemFromCart", this.cart);
    }
  },
  mounted() {
    let user = fb.auth().currentUser;
    let clientData = [];
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        if (admin == true) {
          this.admin = true;
          this.$store.commit("storeevents/setEventDownloaded", true);
        } else {
          this.$binding(
            "clientReservation",
            fs.collection("inspectionEvent").where("id", "==", user.uid)
          )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              showErrorMessage(error.message);
            });
          // let dataRef = fs.collection("inspectionEvent");
          // let clientRef = dataRef
          //   .where("id", "==", user.uid)
          //   .get()
          //   .then(snapshot => {
          //     snapshot.forEach(doc => {
          //       // clientData.id = doc.id;
          //       // clientData.data = doc.data();
          //       // clientData.push(doc.data());
          //       clientData.push(doc.id, doc.data());
          //       console.log(clientData);
          //       this.$store.commit("storeevents/setEventDownloaded", true);
          //     });
          //   })
          //   .catch(err => {
          //     console.log("Error getting documents", err);
          //   });
          // this.clientReservation = clientData;
        }
      });
    }
  },
  computed: {
    ...mapState("storeservices", ["cart"]),
    ...mapGetters("storeservices", ["totalPrice"]),
    ...mapState("auth", ["loggedIn", "userDetails"])
  },
  components: {
    FullCalendar,
    "add-event": require("components/Calendar/Modals/AddEvent").default,
    "edit-event": require("components/Calendar/Modals/EditEvent").default
  }
};
</script>

<style></style>
