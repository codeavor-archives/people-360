<template>
  <q-page class="q-mt-md">
    <div class>
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
              v-if="setAdmin"
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
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
    </div>
    <q-dialog v-model="showAddInspectorSched">
      <add-inspector-schedule :start="start" @close="showAddInspectorSched = false"></add-inspector-schedule>
    </q-dialog>
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
      inspectorSchedules: fs.collection("inspectorSchedules")
    };
  },
  components: {
    FullCalendar,
    "add-event": require("components/Calendar/Modals/AddEvent").default,
    "show-event": require("components/Calendar/Modals/ShowEvent").default,
    "edit-event": require("components/Calendar/Modals/EditEvent").default,
    "calendar-table": require("components/Calendar/CalendarTable").default,
    "add-inspector-schedule": require("components/Inspector/Modal/AddInspectorSchedule")
      .default
  },
  data() {
    return {
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
      }
      //   calendarPlugins: [ resourceTimelinePlugin ]
    };
  },
  methods: {
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
    }
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
            fs.collection("preproposals").where("id", "==", user.uid)
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
  created() {
    let user = fb.auth().currentUser;
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        if (admin == true) {
          this.admin = true;
        }
      });
    }
  }
  // beforeMount() {
  //   this.locale = this.$q.lang.getLocale() || "en-PH";
  //   this.updateFormatter();
  // },
  // watch: {
  //   locale() {
  //     if (this.locale.length > 2) {
  //       this.updateFormatter();
  //     }
  //   },
  //   shortMonthLabel() {
  //     this.updateFormatter();
  //   }
  // }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>
