<template>
  <q-page>
    <template v-if="cart.length">
      <div class="text-subtitle2">
        <q-card-section>
          <div class="text-h6 text-primary">Formal Quotation</div>
        </q-card-section>
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
                item.service_price
                | currency("₱", 2, { decimalSeparator: "." })
                }}
              </q-badge>
              <q-item-label caption>Qty: {{ item.service_quantity }}</q-item-label>
              <q-btn dense round size="8px" @click="removeToCart(item)" icon="clear" flat></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-separator />

      <q-card-actions align="right" class="q-pr-md row">
        <q-badge color="red">Note: Please review items before to submit</q-badge>
        <q-space></q-space>
        <div align="right" class>
          <q-item-label class="text-grey-8 q-pb-xs">
            Total:
            <strong>{{ totalPrice | currency("₱", 2, { decimalSeparator: "." }) }}</strong>
          </q-item-label>

          <q-item-label class="text-grey-8 q-pb-xs" v-if="userDetails.roles == 'new'">
            ADD 12% VAT
            <strong>
              {{
              computeTax
              | currency("₱", 2, { decimalSeparator: "." })
              }}
            </strong>
          </q-item-label>
          <q-item-label class="text-grey-8 q-pb-xs" v-if="userDetails.roles == 'new'">
            Mobilization Fee:
            <strong>
              {{
              preproposal.mobilizationFee.newClientPrice
              | currency("₱", 2, { decimalSeparator: "." })
              }}
            </strong>
          </q-item-label>
          <q-item-label class="text-grey-8 q-pb-xs" v-if="userDetails.roles == 'old'">
            Mobilization Fee:
            <strong>
              {{
              preproposal.mobilizationFee.oldClientPrice
              | currency("₱", 2, { decimalSeparator: "." })
              }}
            </strong>
          </q-item-label>

          <q-item-label class="q-pb-xs" v-if="userDetails.roles == 'new'">
            <strong>GRAND TOTAL:</strong>
            <strong style=" font-size: 15px;">
              {{
              grandTotalforNew | currency("₱", 2, { decimalSeparator: "." })
              }}
            </strong>
          </q-item-label>
          <q-item-label class="q-pb-xs" v-if="userDetails.roles == 'old'">
            <strong>GRAND TOTAL:</strong>
            <strong style=" font-size: 15px;">
              {{
              grandTotalforOld | currency("₱", 2, { decimalSeparator: "." })
              }}
            </strong>
          </q-item-label>
        </div>
      </q-card-actions>
      <q-card-actions class>
        <q-item-label class="q-ml-md">
          <q-item-label class="col text-justify q-pb-xs">
            <strong>1.</strong>
            If there's a Lifting Equipment, test weight for load testing, as well as necessary equipment for moving the test weights will be provided by the
            <strong>{{this.userDetails.companyName}}</strong>
          </q-item-label>
          <q-item-label class="col text-justify q-pb-xs">
            <strong>2.</strong>
            <strong>{{this.userDetails.companyName}}</strong> will provide a counterpart Safety Officer who will be the dedicated Liason Officer to coordinate with the other concerned parties within its organization.
          </q-item-label>
          <q-item-label class="col text-justify q-pb-xs">
            <strong>3.</strong>
            <strong>All equipment inspected, even if it is deemed that inspection is no longer necessary on that equipment, whether it passes or fails, will be included in the billing</strong>
          </q-item-label>
          <q-item-label class="col text-justify q-pb-xs">
            <strong>4.</strong>
            <strong>Grace Period:</strong> If equipment fails an inspection, there will be a
            <strong>30-days grace period</strong>- within this period only mobilization will be billed for the reinspection. Beyond that period, it will be billed as new equipment.
          </q-item-label>
          <q-item-label class="col text-justify q-pb-xs">
            <strong>5.</strong>
            <strong>Equipment Breakdown.</strong>
            PEOPLE360 is not responsible for any loss, destruction, or damage that may occur during the conduct of inspection of the units of equipment, nor any parts of said number of equipment, covered by this agreement.
          </q-item-label>
          <q-item-label class="col text-justify q-pb-xs">
            <strong>6.</strong>
            If DOLE Witness is required,
            <strong>({{this.userDetails.companyName}})</strong> will make the necessary arrangements.
          </q-item-label>
          <q-item-label class="col text-justify q-pb-md">
            <strong>7.</strong>
            This qoutation is only valid for 6 months after the date of issuance.
          </q-item-label>
        </q-item-label>
        <q-item-label class="col-6 text-justify q-pb-lg">Yours Very Truly,</q-item-label>
        <div class="row">
          <q-item-label class="col text-justify q-pb-lg">Conforme:</q-item-label>
          <q-item-label class="col-12 text-justify q-pt-md">
            For
            <strong>{{this.userDetails.companyName}}</strong>
          </q-item-label>
        </div>
        <div class="row col-6">
          <q-item-label class="col-12 text-justify">(Safety Associate Name):</q-item-label>
          <q-item-label class="col-12 text-justify">Safety Associate</q-item-label>
        </div>
        <div class="row col-6 q-mt-lg">
          <q-item-label class="col text-justify q-pb-lg">(Signature Over Printed Name, Date)</q-item-label>
        </div>
      </q-card-actions>
      <div class="q-mt-md">
        <q-form @submit.prevent="requestProposal">
          <q-card flat class="my-card bg-white text-primary">
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
              <q-select
                :rules="[val => !!val || 'Field is required']"
                v-model="preproposal.mobilizationFee"
                class="col q-mb-none q-pb-sm"
                :options="locations"
                label="Location"
              ></q-select>
              <q-input
                v-model="preproposal.start"
                lazy-rules
                class="col q-mb-none q-pb-sm"
                label="Start Date"
              >
                <template v-slot:append>
                  <q-icon v-if="preproposal.start" name="close" class="cursor-pointer" />
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date
                        @input="() => $refs.qDateProxy.hide()"
                        v-model="preproposal.start"
                        mask="YYYY-MM-DD"
                        landscape
                        :options="optionsFn"
                      />
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
      preproposals: fs.collection("preproposals"),
      mobilizationFees: fs.collection("mobilizationFees")
    };
  },
  data() {
    return {
      todaysDate: "",
      date: "2020/02/17",
      locations: [],
      start: "",
      end: "",
      medium: false,
      showEditEvent: false,
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
      grandTotalforNewClient: "",
      grandTotalforOldClient: "",
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
        itemPurchase: [],
        fullName: "",
        mobilizationFee: "",
        totalEquipmentPrice: "",
        projectLocation: ""

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
    optionsFn(preproposal) {
      var today = new Date();
      var year = new Date();
      var addDay = today.setDate(today.getDate() + 1);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "/" + mm + "/" + dd;
      // console.log(today);

      return preproposal > today && preproposal <= "3000/03/15";
    },
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
    requestProposals() {
      console.log(this.preproposal.mobilizationFee.value);
      console.log(this.grandTotalforNew);
      console.log(this.grandTotalforOld);
      if (this.userDetails.roles == "new") {
        console.log(this.preproposal.mobilizationFee.newClientPrice);
      } else {
        console.log(this.preproposal.mobilizationFee.oldClientPrice);
      }
      console.log(this.totalPrice);
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
      this.preproposal.fullName =
        this.userDetails.name +
        " " +
        this.userDetails.middleName.charAt(0) +
        ". " +
        this.userDetails.lastName;
      // this.preproposal.quantity = data;
      // this.preproposal.service_price = data2;
      // this.preproposal.equipment = data3;
      // this.preproposal.name = data4;
      this.preproposal.projectLocation = this.preproposal.mobilizationFee.label;
      this.preproposal.itemPurchase = this.cart;
      this.preproposal.companyName = this.userDetails.companyName;
      if (this.userDetails.roles == "new") {
        this.preproposal.status = false;
        this.preproposal.totalPrice = this.grandTotalforNewClient;
        this.preproposal.mobilizationFee = this.preproposal.mobilizationFee.newClientPrice;
        // this.preproposal.projectLocation = this.preproposal.mobilizationFee.value;
      } else {
        this.preproposal.status = true;
        this.preproposal.totalPrice = this.grandTotalforOldClient;
        this.preproposal.mobilizationFee = this.preproposal.mobilizationFee.oldClientPrice;
        // this.preproposal.projectLocation = this.preproposal.mobilizationFee.value;
      }

      if (this.preproposal.optionReport === "Yes") {
        this.preproposal.optionReport = true;
      }

      // if (this.userDetails.roles == "new") {
      //   this.preproposal.totalPrice = this.grandTotalforNewClient;
      // } else {
      //   this.preproposal.totalPrice = this.grandTotalforOldClient;
      // }
      //  if (this.userDetails.roles == "new") {
      //   console.log(this.preproposal.mobilizationFee.newClientPrice);
      // } else {
      //   console.log(this.preproposal.mobilizationFee.oldClientPrice);
      // }

      this.preproposal.totalEquipmentPrice = this.totalPrice;
      this.preproposal.title =
        this.preproposal.companyName + " " + this.preproposal.location;
      this.$firestore.preproposals
        .add(this.preproposal)
        .then(response => {
          this.$store.commit("storeservices/removeItemFromCart", this.cart);
          this.clear();
          console.log(response);
          this.$q.loading.hide();
          if (this.userDetails.roles == "new") {
            this.$q.dialog({
              title: "Success",
              message: "Please proceed for downpayment",
              persistent: true
            });
          } else {
            this.$q.dialog({
              title: "Reserved",
              message: "Please wait for inspectors",
              persistent: true
            });
          }
          this.$store.commit("storeservices/removeItemFromCart", this.cart);
        })
        .catch(error => {
          showErrorMessage(error.message);
          console.log(error);
        });
      // this.$store.commit("storeservices/removeItemFromCart", this.cart);
    }
  },
  mounted() {
    var today = new Date();
    var year = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    this.todaysDate = today;

    this.$binding("locations", fs.collection("mobilizationFees"));

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
    //   hasremarks() {
    //   return (
    //     this.form.remarks == "For Processing" ||
    //     this.form.remarks == "Ready for Release"
    //   );
    // },
    // disabled() {
    //   return (
    //     this.form.received_by === null ||
    //     !this.form.received_by ||
    //     this.form.issued_by === null ||
    //     !this.form.issued_by
    //   );
    // }
    computeTax() {
      return (this.totalPrice * 12) / 100;
    },
    grandTotalforNew() {
      return (this.grandTotalforNewClient =
        +this.totalPrice +
        +this.preproposal.mobilizationFee.newClientPrice +
        (+this.totalPrice * 12) / 100);
    },
    grandTotalforOld() {
      return (this.grandTotalforOldClient =
        +this.totalPrice + +this.preproposal.mobilizationFee.oldClientPrice);
    },
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
