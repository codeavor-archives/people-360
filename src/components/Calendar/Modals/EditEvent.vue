<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-form @submit.prevent="fbEditEvent">
      <q-card-section class="row">
        <div class="text-h6">Edit Event</div>
        <q-space></q-space>
        <div>
          <q-btn v-close-popup flat round dense icon="close"></q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="title"
          class="col"
          label="Event Title"
          v-model="event.title"
        >
          <template v-slot:append>
            <q-icon v-if="event.title" name="close" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="details"
          class="col"
          label="Event Details"
          v-model="event.details"
        ></q-input>

        <q-input
          v-model="event.start"
          :rules="[val => !!val || 'Field is required']"
          class="col"
          label="Start Date"
        >
          <template v-slot:append>
            <q-icon v-if="event.start" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" landscape v-model="event.start" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="event.end"
          :rules="[val => !!val || 'Field is required']"
          class="col"
          label="End Date"
        >
          <template v-slot:append>
            <q-icon v-if="event.end" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" landscape v-model="event.end" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="event.color" :rules="['anyColor']" class="col my-input">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="event.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn icon="save" color="primary" type="submit" label="Save" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import { uid } from "quasar";
import { fb, db, fs } from "boot/firebase";

export default {
  // props: ["event", "id"],
  props: ["events", "title", "details", "id", "color", "start", "end"],
  firestore() {
    return {
      inspectionEvent: fs.collection("inspectionEvent")
    };
  },
  data() {
    return {
      event: {
        title: "",
        details: "",
        start: "",
        end: "",
        color: ""
      }
    };
  },
  mounted() {
    this.event.title = this.title;
    this.event.details = this.details;
    this.event.color = this.color;
    this.event.start = this.start;
    this.event.end = this.end;
  },
  methods: {
    // ...mapActions("storeevents", ["addEvent"]),
    fbEditEvent() {
      this.event;
      this.$q.loading.show();
      this.$firestore.inspectionEvent
        .doc(this.id)
        .update(this.event)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.showEditEvent = false;
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide;
          this.showEditEvent = false;
        });
      this.$emit("close");
    }
  }
};
</script>
<style lang="sass" scoped>

</style>