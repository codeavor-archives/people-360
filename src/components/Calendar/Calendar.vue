<template>
  <q-page class="col">
    <div class="row">
      <q-toolbar class="calendar-header">
        {{ title }}
        <q-btn
          class="q-mr-sm"
          color="white"
          flat
          @click="setToday"
          label="Today"
        ></q-btn>
        <q-btn
          class="q-mr-sm"
          color="white"
          flat
          round
          icon="chevron_left"
          @click="calendarPrev"
        ></q-btn>
        <q-btn
          flat
          round
          color="white"
          icon="chevron_right"
          @click="calendarNext"
        ></q-btn>
        <q-space></q-space>
        <q-btn icon-right="arrow_drop_down" outline color="white">
          <span>{{ typeToLabel[type] }} {{ title }}</span>
          <q-menu transition-show="scale" transition-hide="scale">
            <!-- <template v-slot:activator="{on}">
              <q-btn icon="arrow_drop_down" outline v-on="on">
                <span>{{typeToLabel[type]}}</span>
              </q-btn>
            </template>-->
            <q-list>
              <q-item clickable @click="type = 'day'">
                <q-item-label>Day</q-item-label>
              </q-item>

              <q-item clickable @click="type = 'week'">
                <q-item-label>Week</q-item-label>
              </q-item>

              <q-item clickable @click="type = 'month'">
                <q-item-label>Month</q-item-label>
              </q-item>

              <q-item clickable @click="type = '4day'">
                <q-item-label>4 days</q-item-label>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </div>
    <div class="row">
      <QCalendar
        locale="en-ph"
        :now="today"
        enable-theme
        :view="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
        :type="type"
        :event-color="getEventColor"
        :event="events"
        :weekdays="[1, 2, 3, 4, 5, 6]"
        color="primary"
        :animated="true"
        :title="title"
        mini-mode="auto"
        v-touch-swipe.mouse.left.right="handleSwipe"
        ref="calendar"
        v-model="date"
      >
        <template #week="{ week, weekdays, miniMode }">
          <template v-if="!miniMode">
            <template
              v-for="(computedEvent, index) in getWeekEvents(week, weekdays)"
            >
              <q-badge
                :key="index"
                class="q-row-event"
                :class="badgeClasses(computedEvent, 'day')"
                :style="badgeStyles(computedEvent, 'day', week.length)"
              >
                <template v-if="computedEvent.event">
                  <q-icon
                    :name="computedEvent.event.icon"
                    class="q-mr-xs"
                  ></q-icon>
                  <span class="ellipsis">{{ computedEvent.event.title }}</span>
                </template>
              </q-badge>
            </template>
          </template>
        </template>
      </QCalendar>
      <q-menu
        full-width
        transition-show="scale"
        transition-hide="scale"
        class="menu full-width"
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        anchor="center middle"
        self="center middle"
      >
        <q-card color="grey lighten-4" min-width="350px" flat>
          <q-toolbar :color="selectedEvent.color" dark>
            <q-btn color="secondary" flat round icon="edit">
              <!-- <q-icon>mdi-pencil</q-icon> -->
            </q-btn>
            <q-toolbar-title class="bg-secondary" v-html="selectedEvent.name"
              >Selected event name</q-toolbar-title
            >
            <q-space></q-space>
            <q-btn flat color="secondary" round icon="add"></q-btn>
            <q-btn flat color="secondary" round icon="add"></q-btn>
          </q-toolbar>
          <q-card>
            <span v-html="selectedEvent.details">Selected event details</span>
          </q-card>
          <q-card-actions>
            <q-btn outline color="secondary" @click="selectedOpen = false"
              >Cancel</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-menu>
    </div>
  </q-page>
</template>
<script>
import QCalendar from "@quasar/quasar-ui-qcalendar";
import { fb, db } from "boot/firebase";
const CURRENT_DAY = new Date();

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = QCalendar.parseDate(newDay);
  return tm.date;
}
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    date: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false
  }),
  computed: {
    title() {
      if (this.titleFormatter && this.locale && this.selectedDate) {
        const date = new Date(this.selectedDate);
        return this.titleFormatter.format(date);
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let snapshot = await db.ref("inspectionEvent/");
      let events = [];
      snapshot.once("value").then(snapshot => {
        snapshot.forEach(doc => {
          let appData = doc.val();
          appData.id = doc.key;
          events.push(appData);
        });
      });
      this.events = events;
      console.log(events);
    },
    getEventColor(ev) {
      return ev.color;
    },
    updateFormatter() {
      try {
        this.titleFormatter = new Intl.DateTimeFormat(this.locale || void 0, {
          month: this.shortMonthLabel ? "short" : "long",
          year: "numeric",
          timeZone: "UTC"
        });
      } catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.titleFormatter = void 0;
      }
    },
    handleSwipe({ evt }) {
      if (this.dragging === false) {
        if (info.duration >= 30 && this.ignoreNextSwipe === false) {
          if (info.direction === "right") {
            this.calendarPrev();
          } else if (info.direction === "left") {
            this.calendarNext();
          }
        } else {
          this.ignoreNextSwipe = false;
        }
      }
      stopAndPrevent(evt);
      evt.cancelable !== false && evt.preventDefault();
      evt.stopPropagation();
    },
    calendarNext() {
      this.$refs.calendar.next();
    },

    calendarPrev() {
      this.$refs.calendar.prev();
    },
    viewDay({ date }) {
      this.date = date;
      this.type = "day";
    },
    setToday() {
      // this.focus = this.today;
      // setToday = new Date()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.start = start;
      this.end = end;
      this.events = events;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  },
  components: {
    QCalendar
  },
  beforeMount() {
    this.locale = this.$q.lang.getLocale() || "en-PH";
    this.updateFormatter();
  },
  watch: {
    locale() {
      if (this.locale.length > 2) {
        this.updateFormatter();
      }
    },
    shortMonthLabel() {
      this.updateFormatter();
    }
  }
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style lang="sass">
.q-calendar-daily__day-interval:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__workweek:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__day:hover
  background-color: rgba(0,0,255,.1)

.q-calendar-weekly__head-weekday:hover
  background-color: rgba(0,0,255,.1)
</style>
<style lang="css">
.calendar-header {
  background: rgb(49, 112, 227);
}
</style>
