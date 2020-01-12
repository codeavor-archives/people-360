<template>
  <q-page padding class>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show12HourFormat" color="blue" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="showTaskInOneList" color="blue" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-list bordered padding>
      <q-item-label header>More</q-item-label>
      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item @click="visitWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit Our Website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { openURL } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageSettings",
  computed: {
    ...mapGetters("storesettings", ["settings"]),
    show12HourFormat: {
      get() {
        return this.settings.show12HourFormat;
      },
      set(value) {
        // trigger an action
        this.setshow12HourFormat(value);
      }
    },
    showTaskInOneList: {
      get() {
        return this.settings.showTaskInOneList;
      },
      set(value) {
        // trigger an action
        this.setshowTaskInOneList(value);
      }
    }
  },
  methods: {
    ...mapActions("storesettings", [
      "setshow12HourFormat",
      "setshowTaskInOneList"
    ]),
    visitWebsite() {
      openURL("http://www.google.com");
    },
    emailUs() {
      window.location.href =
        "mailto:hello@awesometodo.com?subject=Awesome Todo Feedback";
    }
  }
};
</script>
