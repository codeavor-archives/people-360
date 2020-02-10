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
    <div class="q-mt-xl" v-if="setAdmin">
      <calendar-table></calendar-table>
    </div>

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
    "edit-event": require("components/Calendar/Modals/EditEvent").default,
    "calendar-table": require("components/Calendar/CalendarTable").default
  },
  data() {
    return {
      start: "",
      end: "",
      clientReservation: {},
      admin: false,
      hiddenDays: [0],
      medium: false,
      showEditEvent: false,
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
      // console.log(arg.);
      this.showEditEvent = true;
      console.log(arg);
      this.event.title = arg.event.title;
      this.event.details = arg.event.extendedProps.details;
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
      this.medium = true;
      this.start = arg.startStr;
      this.end = arg.endStr;
    },

    getEventColor(ev) {
      return ev.color;
    }
    // updateFormatter() {
    //   try {
    //     this.titleFormatter = new Intl.DateTimeFormat(this.locale || void 0, {
    //       month: this.shortMonthLabel ? "short" : "long",
    //       year: "numeric",
    //       timeZone: "UTC"
    //     });
    //   } catch (e) {
    //     // console.error('Intl.DateTimeFormat not supported')
    //     this.titleFormatter = void 0;
    //   }
    // },
    // handleSwipe({ evt }) {
    //   if (this.dragging === false) {
    //     if (info.duration >= 30 && this.ignoreNextSwipe === false) {
    //       if (info.direction === "right") {
    //         this.calendarPrev();
    //       } else if (info.direction === "left") {
    //         this.calendarNext();
    //       }
    //     } else {
    //       this.ignoreNextSwipe = false;
    //     }
    //   }
    //   stopAndPrevent(evt);
    //   evt.cancelable !== false && evt.preventDefault();
    //   evt.stopPropagation();
    // },
    // calendarNext() {
    //   this.$refs.calendar.next();
    // },

    // calendarPrev() {
    //   this.$refs.calendar.prev();
    // },
    // viewDay({ date }) {
    //   this.date = date;
    //   this.type = "day";
    // },
    // setToday() {
    //   // this.focus = this.today;
    //   // setToday = new Date()
    // },
    // showEvent({ nativeEvent, event }) {
    //   const open = () => {
    //     this.selectedEvent = event;
    //     this.selectedElement = nativeEvent.target;
    //     setTimeout(() => (this.selectedOpen = true), 10);
    //   };

    //   if (this.selectedOpen) {
    //     this.selectedOpen = false;
    //     setTimeout(open, 10);
    //   } else {
    //     open();
    //   }

    //   nativeEvent.stopPropagation();
    // },
    // updateRange({ start, end }) {
    //   const events = [];

    //   const min = new Date(`${start.date}T00:00:00`);
    //   const max = new Date(`${end.date}T23:59:59`);
    //   const days = (max.getTime() - min.getTime()) / 86400000;
    //   const eventCount = this.rnd(days, days + 20);

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0;
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
    //     const second = new Date(first.getTime() + secondTimestamp);

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: this.formatDate(first, !allDay),
    //       end: this.formatDate(second, !allDay),
    //       color: this.colors[this.rnd(0, this.colors.length - 1)]
    //     });
    //   }

    //   this.start = start;
    //   this.end = end;
    //   this.events = events;
    // },
    // nth(d) {
    //   return d > 3 && d < 21
    //     ? "th"
    //     : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    // },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // },
    // formatDate(a, withTime) {
    //   return withTime
    //     ? `${a.getFullYear()}-${a.getMonth() +
    //         1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
    //     : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    // }
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
