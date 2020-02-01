<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated v-if="loggedIn">
      <q-toolbar>
        <q-btn
          v-if="loggedIn && !this.$route.params.id"
          class="hamburger"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-btn
          v-if="loggedIn && this.$route.params.id"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          v-go-back.single
        />
        <q-toolbar-title class="text-center" v-if="loggedIn">
          <q-img src="../../download.jpg" class="logo"></q-img>
          {{ title }}
        </q-toolbar-title>
        <q-btn round flat icon="shopping_cart">
          <q-menu :offset="[40, 10]">
            <q-card class="my-card" flat>
              <q-card-section class="bg-white text-primary">
                <div class="text-subtitle2">
                  <q-list>
                    <q-item v-for="item in cart" :key="item.id">
                      <q-item-section top avatar>
                        <q-avatar>
                          <img :src="item.service_photo" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{item.service_name}}</q-item-label>
                        <q-item-label caption>{{item.service_equipment}}</q-item-label>
                      </q-item-section>

                      <q-item-section side top>
                        <q-badge>₱ {{item.service_price}}</q-badge>
                        <q-item-label caption>Qty: {{item.service_quantity}}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right" class="q-pa-xs">
                <q-space></q-space>
                <q-item-label caption>Total &nbsp;</q-item-label>
                <q-badge>₱ {{totalPrice}}</q-badge>
                <q-space></q-space>
                <q-btn to="/checkout" flat color="primary" label="Proceed"></q-btn>
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
        <q-btn-dropdown round flat v-if="loggedIn" push dropdown-icon="more_vert" dense>
          <div class="row no-wrap q-pa-sm">
            <div class="column">
              <div class="text-h6">Settings</div>
              <q-item tag="label" v-ripple dense>
                <q-item-section>
                  <q-item-label>Show 12 hour time format</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="show12HourFormat" color="blue" />
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple dense>
                <q-item-section>
                  <q-item-label>Show tasks in one list</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="showTaskInOneList" color="blue" />
                </q-item-section>
              </q-item>
            </div>
            <q-separator vertical inset class="q-mr-xs" />
            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="userDetails.photo" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userDetails.email }}</div>
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
    <q-footer v-if="loggedIn && !this.$route.params.id">
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
      v-if="loggedIn && !this.$route.params.id"
      :width="260"
      :breakpoint="767"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-secondary"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-expansion-item icon="how_to_reg" label="Inspectors">
          <q-item to="/inspectors" exact clickable class="q-pl-xl">
            <q-item-section avatar>
              <q-icon name="how_to_reg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Inspectors</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/positions" exact clickable class="q-pl-xl">
            <q-item-section avatar>
              <q-icon name="playlist_add_check" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Positions</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item icon="build" label="Services">
          <q-item to="/services" exact clickable class="q-pl-xl">
            <q-item-section avatar>
              <q-icon name="build" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Services</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/list-services" exact clickable class="q-pl-xl">
            <q-item-section avatar>
              <q-icon name="format_list_bulleted" />
            </q-item-section>
            <q-item-section>
              <q-item-label>List of Services</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item to="/reservation" exact clickable>
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reservation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/users" exact clickable>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage User</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="nav in navs" :key="nav.label" :to="nav.to" exact clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="settings" label="Settings">
          <q-item to="/settings" exact clickable class="q-pl-xl">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>General Settings</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db } from "boot/firebase";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";
export default {
  name: "MyLayout",
  mixins: [mixinOtherUserDetails],
  props: ["tab"],
  data() {
    return {
      profilePhoto: {},
      chat: "",
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        // {
        //   label: "Todo",
        //   icon: "list",
        //   to: "/"
        // },
        {
          label: "Chat",
          icon: "chat_bubble",
          to: "/contacts"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"]),
    ...mapState("storeservices", ["cart"]),
    ...mapGetters("storesettings", ["settings"]),
    ...mapGetters("storeservices", ["totalPrice"]),
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
      if (currentPath == "/") return "People 360";
      else if (currentPath.includes("/chat")) return this.otherUserDetails.name;
      else if (currentPath == "/auth") return "Login";
      else if (currentPath == "/settings") return "Settings";
      else if (currentPath == "/contacts") return "Contacts";
      else return "People 360";
    }
  },
  methods: {
    ...mapActions("auth", [
      "logoutUser",
      "fbGetMessages",
      "fbStopGettingMessages"
    ]),
    ...mapActions("storesettings", [
      "setshow12HourFormat",
      "setshowTaskInOneList"
    ])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.logo {
  height: 27px;
  width: 30px;
  max-width: 30px;
  max-height: 27px;
}
.my-card {
  width: 300px;
  max-width: 350px;
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


