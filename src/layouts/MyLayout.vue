<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="loggedIn"
          class="hamburger"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="text-center" v-if="loggedIn">{{title}}</q-toolbar-title>
        <!-- <q-btn
          no-caps
          v-if="!loggedIn"
          to="/auth"
          flat
          class="absolute-right"
          icon="account_circle"
          label="Login"
        />-->
        <q-btn-dropdown flat v-if="loggedIn" push dropdown-icon="more_vert" dense>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
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
            </div>
            <q-separator vertical inset class="q-mr-xl" />
            <div class="column items-center q-mr-md">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">{{userDetails.email}}</div>
              <q-btn
                color="primary"
                label="Logout"
                size="sm"
                push
                @click="logoutUser"
                v-close-popup
                icon="power_settings_new"
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-footer v-if="this.$route.fullPath!='/chat' && loggedIn">
      <q-tabs active-color="white" dense no-caps>
        <q-route-tab
          clickable
          v-for="nav in navs"
          :key="nav.label"
          exact
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="loggedIn"
      :width="260"
      :breakpoint="767"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item v-for="nav in navs" :key="nav.label" :to="nav.to" exact clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "MyLayout",
  props: ["tab"],
  data() {
    return {
      // leftDrawerOpen: false
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: "Todo",
          icon: "list",
          to: "/"
        },
        {
          label: "Chat",
          icon: "chat_bubble",
          to: "/chat"
        },
        {
          label: "Users",
          icon: "people",
          to: "/users"
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/settings"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"]),
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
    },
    title() {
      // console.log(this.$route)
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "Asset Management";
      else if (currentPath == "/chat") return "Chat";
      else if (currentPath == "/auth") return "Login";
      else if (currentPath == "/settings") return "Settings";
      else if (currentPath == "/users") return "Contacts";
      else return "Asset Management";
    }
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    ...mapActions("storesettings", [
      "setshow12HourFormat",
      "setshowTaskInOneList"
    ])
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

// @media screen and (max-width: 768px) {
//   .hamburger {
//     display: none;
//   }
// }
// .q-drawer .q-router-link-exact-active {
//   color: white !important;
// }     ====================This can be applied if your changing the background color of the drawer
</style>
