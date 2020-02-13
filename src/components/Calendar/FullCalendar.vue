<template>
  <q-page class="col">
    <div class="row">
      <FullCalendar
        :plugins="calendarPlugins"
        :header="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }"
        selectable="true"
        :events="preproposals"
        @select="handleSelect"
        @eventClick="handleClick"
        v-if="setAdmin"
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
      />
      <FullCalendar
        :plugins="calendarPlugins"
        :header="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }"
        selectable="true"
        :events="clientReservation"
        @eventClick="handleClick"
        v-else
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
      />
    </div>
    <!-- <div class="q-mt-xl" v-if="setAdmin">
      <calendar-table></calendar-table>
    </div>-->

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
    <q-dialog v-model="showEventDetails">
      <show-event
        :extendedProps="extendedProps"
        :title="event.title"
        :details="event.details"
        :start="event.start"
        :end="event.end"
        :id="event.id"
        :color="event.color"
        @close="showEventDetails = false"
      ></show-event>
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
      preproposals: fs.collection("preproposals")
    };
  },
  components: {
    FullCalendar,
    "add-event": require("components/Calendar/Modals/AddEvent").default,
    "show-event": require("components/Calendar/Modals/ShowEvent").default,
    "edit-event": require("components/Calendar/Modals/EditEvent").default,
    "calendar-table": require("components/Calendar/CalendarTable").default
  },
  data() {
    return {
      clientPreproposals: {},
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
      type: "month",
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
      console.log(arg.event.extendedProps);
      // this.showEditEvent = true;
      this.showEventDetails = true;
      // console.log(arg.event.extendedProps);
      this.event.title = arg.event.title;
      // this.event.details = arg.event.extendedProps.details;
      this.extendedProps = arg.event.extendedProps;
      this.event.id = arg.event.id;
      this.event.color = arg.event.borderColor;
      this.event.start = arg.event.start.toUTCString();
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
      // this.medium = true;
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
          this.$binding(
            "clientPreproposals",
            fs.collection("preproposals").orderBy("companyName")
          );
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
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>
