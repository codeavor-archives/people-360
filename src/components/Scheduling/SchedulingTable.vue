<template>
  <q-page class>
    <div class>
      <div class="row">
        <div class="col q-pr-md">
          <q-table
            :filter="filter"
            title="Available Inspectors"
            color="primary"
            :data="availableInspectors"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="name">{{props.row.name}}</q-td>
                <!-- <q-td :props="props" key="position">{{props.row.position}}</q-td> -->
                <q-td :props="props" key="specialSkill">{{props.row.specialSkill.skillName}}</q-td>
                <!-- <q-td>
                  <q-btn
                    @click="showEditInspectorModal(props.row)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="edit"
                  >
                    <q-tooltip content-class="bg-deep-orange">Edit</q-tooltip>
                  </q-btn>
                </q-td>-->
              </q-tr>
            </template>
          </q-table>
        </div>
        <div class="col">
          <q-table
            :filter="filter"
            title="Approved Projects"
            color="primary"
            :data="approvedProjects"
            :columns="columns2"
            row-key="id"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="companyName">{{props.row.companyName}}</q-td>
                <q-td :props="props" key="start">{{props.row.start}}</q-td>
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="equipment in props.row.itemPurchase"
                      :key="equipment.service_equipment"
                    >
                      <q-card-section>
                        {{equipment.service_equipment}}
                        <!-- <q-btn @click="showdata(props.row)" dense size="8px" icon="edit"></q-btn> -->
                      </q-card-section>
                    </div>
                  </div>
                </q-td>
                <!-- Theres an error there -->
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="quantity in props.row.itemPurchase"
                      :key="quantity.service_quantity"
                    >
                      <q-card-section>{{quantity.service_quantity}}</q-card-section>
                    </div>
                  </div>
                </q-td>
                <!-- Theres an error there -->

                <q-td v-if="setAdmin">
                  <q-btn
                    @click="showEditProposal(props.row)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="edit"
                  ></q-btn>
                  <q-btn
                    @click="approvedProposal(props.row)"
                    v-if="!props.row.status"
                    round
                    color="primary"
                    flat
                    dense
                    icon="thumb_up_alt"
                  >
                    <q-tooltip content-class="bg-accent">Reserved</q-tooltip>
                  </q-btn>
                  <q-btn
                    @click="approvedProposal(proposal)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="thumb_down_alt"
                  >
                    <q-tooltip content-class="bg-red">Cancel</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div class="q-mt-md">
        <div class>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="10">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 text-primary">Inspector Schedules</div>
                  </div>
                </th>
              </tr>
              <FullCalendar
                class="q-pa-md"
                :plugins="calendarPlugins"
                :header="{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,listWeek'
              }"
                selectable="true"
                :events="inspectorSchedules"
                @select="handleSelect"
                @eventClick="handleClick"
                v-if="setAdmin  || userDetails.roles=='Inspector'"
                defaultView="timeGridWeek"
                ref="fullCalendar"
                :event-color="getEventColor"
                :now="today"
                :view="type"
                :type="type"
                :title="title"
                v-model="date"
                :hiddenDays="hiddenDays"
                :weekends="calendarWeekends"
              />
              <!-- <tr>
              <th class="text-left">Monday</th>
              <th class="text-left">Tuesday</th>
              <th class="text-left">Wednesday</th>
              <th class="text-left">Thursday</th>
              <th class="text-left">Friday</th>
              <th class="text-left">Saturday</th>
              <th class="text-left">Action</th>
              </tr>-->
            </thead>
            <!-- <tbody>
            <tr>
              <td class="text-left">dummy</td>
              <td class="text-left">dummy</td>
              <td class="text-left">dummy</td>
              <td class="text-left">dummy</td>
              <td class="text-left">dummy</td>
              <td class="text-left">dummy</td>
              <td class="text-left">
                <q-btn round color="primary" flat dense icon="edit"></q-btn>
              </td>
            </tr>
            </!-->
          </q-markup-table>
        </div>
      </div>
    </div>
    <!-- Full Calendar Start -->
    <q-dialog v-model="showAddInspectorSched">
      <add-inspector-schedule :start="start" @close="showAddInspectorSched = false"></add-inspector-schedule>
    </q-dialog>
    <!-- Full Calendar End -->

    <q-dialog v-model="editProposal">
      <edit-proposal @close="editProposal = false" :proposals="proposals" :id="id"></edit-proposal>
    </q-dialog>
    <q-dialog v-model="showEditInspector">
      <edit-inspector @close="showEditInspector = false" :inspector="inspector" :id="id"></edit-inspector>
    </q-dialog>
    <!-- <q-dialog v-model="showAddInspectorSched">
      <add-inspector-schedule
        @close="showAddInspectorSched = false"
        :inspector="inspector"
        :id="id"
      ></add-inspector-schedule>
    </q-dialog>-->
  </q-page>
</template>

<script>
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { fb, db, fs } from "boot/firebase";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
export default {
  firestore() {
    return {
      inspectors: fs.collection("inspectors"),
      positions: fs.collection("positions"),
      preproposals: fs.collection("preproposals"),
      inspectorSchedules: fs.collection("inspectorSchedules")
    };
  },
  data() {
    return {
      // Full Calendar Start
      showAddInspectorSched: false,
      start: "",
      end: "",
      clientReservation: {},
      admin: false,
      hiddenDays: [0],
      medium: false,
      showEditEvent: false,
      showEventDetails: false,
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin
      ],
      calendarWeekends: true,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      date: "",
      type: "week",
      title: null,
      details: null,
      start: null,
      end: null,
      color: "#1976D2",
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      extendedProps: {},
      events: [],
      dialog: false,
      event: {
        title: "",
        details: "",
        start: "",
        end: "",
        color: "",
        id: ""
      },
      //FullCalendar end

      proposals: {},
      id: "",
      editProposal: false,
      availableInspectors: [],
      approvedProjects: [],
      inspectorSchedule: "",
      idInspector: "",
      key: {},
      id: "",
      showEditInspector: false,
      showAddInspectorSched: false,
      inspector: {
        id: "",
        name: "",
        available: "true"
      },
      filter: "",
      columns: [
        {
          name: "name",
          align: "left",
          label: "Full Name",
          sortable: true,
          field: "name"
        },
        // {
        //   name: "position",
        //   align: "left",
        //   label: "Position",
        //   sortable: true,
        //   field: "position"
        // },
        {
          name: "specialSkill",
          align: "left",
          label: "Special Skill",
          sortable: true,
          field: "specialSkill"
        }
        // {
        //   name: "email",
        //   align: "left",
        //   label: "Email",
        //   sortable: true,
        //   field: "email"
        // },
        // {
        //   align: "left",
        //   label: "Action"
        // }
      ],
      columns2: [
        {
          name: "companyName",
          align: "left",
          label: "Company Name",
          sortable: true,
          field: "companyName"
        },
        {
          name: "start",
          align: "left",
          label: "Start Date",
          sortable: true,
          field: "start"
        },
        {
          name: "itemPurchase",
          align: "left",
          label: "Equipment",
          sortable: true,
          field: "itemPurchase"
        },
        {
          name: "itemPurchase.service_quantity",
          align: "left",
          label: "Quantity",
          sortable: true,
          field: "itemPurchase.service_quantity"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    // showdata(props) {
    //   console.log(props.itemPurchase);
    // },

    // Full Calendar Start
    handleClick(arg) {
      // console.log(arg.event.extendedProps);
      // this.showEditEvent = true;
      this.showEventDetails = true;
      // console.log(arg.event.extendedProps);
      this.event.title = arg.event.title;
      // this.event.details = arg.event.extendedProps.details;
      this.extendedProps = arg.event.extendedProps;
      this.event.id = arg.event.id;
      this.event.color = arg.event.borderColor;
      // this.event.start = arg.event.start.getDay();
      // let year = arg.event.start.getFullYear();
      // let month = arg.event.start.getDay();
      // let day = arg.event.start.getDate();

      // this.event.start = year + "-" + month + "-" + day;

      // let yearend = arg.event.end.getFullYear();
      // let monthend = arg.event.end.getMonth();
      // let dayend = arg.event.end.getDay();

      // this.event.end = yearend + "-" + monthend + "-" + dayend;
    },
    handleSelect(arg) {
      console.log(arg);
      this.showAddInspectorSched = true;
      this.start = arg.startStr;
      this.end = arg.endStr;
    },

    getEventColor(ev) {
      return ev.color;
    },
    // Full Calendar End

    showEditProposal(proposal) {
      this.editProposal = true;
      this.proposals = proposal;
      this.id = proposal.id;
      // console.log(proposal.itemPurchase);
    },
    showEditInspectorModal(props) {
      this.showEditInspector = true;
      this.inspector = props;
      this.id = props.id;
      // console.log(inspector.id);
    },
    showAddInspectorSchedule(inspector) {
      this.showAddInspectorSched = true;
      this.inspector = inspector;
      this.id = inspector.id;
      console.log(inspector.id);
    }
  },
  components: {
    "edit-inspector": require("components/Inspector/Modal/EditInspector")
      .default,
    "edit-proposal": require("components/Preproposal/Modals/EditPreproposal")
      .default,
    // "add-inspector-schedule": require("components/Inspector/Modal/AddInspectorSchedule")
    //   .default,
    // Full Calendar Start
    FullCalendar,
    "add-event": require("components/Calendar/Modals/AddEvent").default,
    "show-event": require("components/Calendar/Modals/ShowEvent").default,
    "edit-event": require("components/Calendar/Modals/EditEvent").default,
    "calendar-table": require("components/Calendar/CalendarTable").default,
    "add-inspector-schedule": require("components/Inspector/Modal/AddInspectorSchedule")
      .default
    // Full Calendar end
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),

    ...mapState("storeevents", ["eventDownloaded"]),
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$binding(
      "availableInspectors",
      fs.collection("inspectors").where("available", "==", true)
    );
    this.$binding(
      "approvedProjects",
      fs
        .collection("preproposals")
        .where("status", "==", "approved")
        .orderBy("start")
    );
  }
};
</script>

<style></style>
