<template>
  <q-page padding v-if="admin">
    <!-- <QCalendar></QCalendar> -->
    <div class="full-width full-height column">
      <template v-if="usersDownloaded">
        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut absolute-top"
        >
          <userstable></userstable>
        </transition>

        <div class="text-center q-mb-lg no-pointer-events">
          <!-- <q-btn round class="all-pointer-events" size="24px" icon="add" color="primary" /> -->
          <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
            <q-fab icon="add" direction="up" color="primary">
              <q-fab-action
                @click="showAddUsers = true"
                color="primary"
                icon="person_add"
              />
              <!-- <q-fab-action @click="onClick" color="primary" icon="mail" /> -->
            </q-fab>
          </q-page-sticky>
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>
    <q-dialog v-model="showAddUsers">
      <addusers></addusers>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { fb, fc, db } from "boot/firebase";
// import { QCalendar } from "@quasar/quasar-ui-qcalendar";

export default {
  data() {
    return {
      admin: false,
      showAddUsers: false,
      showEditUsers: false
    };
  },
  computed: {
    //    ...mapGetters("auth", ["users"]),
    // ...mapState("auth", ["usersDownloaded"])

    ...mapGetters("auth", ["users"]),
    ...mapState("auth", ["usersDownloaded"])
  },
  components: {
    // QCalendar,
    addusers: require("components/Users/Modals/AddUsers").default,
    userstable: require("components/Users/Modals/Table/UsersTable").default
  },
  mounted() {
    let user = fb.auth().currentUser;
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        // console.log(admin);
        if (admin == true) {
          this.admin = true;
        }
      });
      // if()
    }
  }
};
</script>

<style></style>
