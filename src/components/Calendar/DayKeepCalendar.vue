<template>
  <DaykeepCalendar />
</template>

<script>
// import { DaykeepCalendar } from "@daykeep/calendar-quasar";
export default {
  data() {
    return {
      someEventObject: [
        [
          {
            id: 1,
            summary: "Test event",
            description: "Some extra info goes here",
            location:
              "Office of the Divine Randomness, 1232 Main St., Denver, CO",
            start: {
              dateTime: "2018-02-16T14:00:00", // ISO 8601 formatted
              timeZone: "America/New_York" // Timezone listed as a separate IANA code
            },
            end: {
              dateTime: "2018-02-16T16:30:00",
              timeZone: "American/New_York"
            },
            color: "positive",
            attendees: [
              {
                id: 5,
                email: "somebody@somewhere.com",
                displayName: "John Q. Public",
                organizer: false,
                self: false,
                resource: false
              }
            ]
          },
          {
            id: 2,
            summary: "Test all-day event",
            description: "Some extra info goes here",
            start: {
              date: "2018-02-16" // A date variable indicates an all-day event
            },
            end: {
              date: "2018-02-19"
            }
          },
          {
            id: 3,
            summary: "Some other test event",
            description: "Some extra info goes here",
            start: {
              dateTime: "2018-02-17T10:00:00+0500" // timezone embedded in dateTime
            },
            end: {
              dateTime: "2018-02-17T12:30:00+0500"
            }
          }
        ]
      ]
    };
  },
  // components: { DaykeepCalendar: require("@daykeep/calendar-quasar").default }
};
</script>

<style></style>
