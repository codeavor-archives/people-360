<template>
  <q-page padding>
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
              <q-fab-action @click="showAddUsers = true " color="primary" icon="person_add" />
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
export default {
  data() {
    return {
      showAddUsers: false
    };
  },
  computed: {
    ...mapGetters("auth", ["users"]),
    ...mapState("auth", ["usersDownloaded"])
  },
  components: {
    addusers: require("components/Users/Modals/AddUsers").default,
    userstable: require("components/Users/Modals/Table/UsersTable").default
  }
};
</script>

<style>
</style>