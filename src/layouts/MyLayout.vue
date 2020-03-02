<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="header" elevated v-if="loggedIn">
      <q-toolbar>
        <q-btn
          v-if="loggedIn && !this.$route.params.id"
          class="hamburger"
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-btn
          v-if="loggedIn && this.$route.params.id"
          flat
          round
          icon="arrow_back"
          aria-label="Menu"
          v-go-back.single
        />
        <q-toolbar-title class="text-center" v-if="loggedIn">
          <!-- <q-avatar size="30px" class> -->
          <q-img class="logo" src="../../download.jpg">
            <!-- remove class="logo" -->
          </q-img>
          <!-- </q-avatar> -->
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!setAdmin || !userDetails.roles=='Inspector'"
          @click="showMyCart"
          round
          flat
          icon="shopping_cart"
        >
          <q-menu :offset="[40, 10]">
            <q-card class="my-card" flat>
              <template v-if="cart.length">
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
                          <q-badge>{{item.service_price | currency("₱", 2, { decimalSeparator: "." })}}</q-badge>
                          <q-item-label caption>Qty: {{item.service_quantity}}</q-item-label>
                          <q-btn round size="8px" @click="removeToCart(item)" icon="clear" flat></q-btn>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-card-section>
              </template>
              <template v-else>
                <div class="text-center q-pa-md">No items on cart</div>
              </template>
              <q-separator />
              <q-card-actions align="right" class="q-pa-xs">
                <q-space></q-space>
                <q-item-label caption>Total &nbsp;</q-item-label>
                <q-badge>{{totalPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-badge>
                <q-space></q-space>
                <q-btn to="/checkout" flat color="primary" label="Checkout"></q-btn>
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
        <q-btn-dropdown round flat v-if="loggedIn" push dropdown-icon="more_vert">
          <div class="row no-wrap q-pa-sm">
            <div class="column">
              <div class="text-h6">Settings</div>
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
    <!-- <q-footer class="footer" v-if="loggedIn && !this.$route.params.id">
      <q-tabs active-color="white"  no-caps>
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
    </q-footer>-->

    <q-drawer
      class="side-drawer"
      v-if="loggedIn && !this.$route.params.id"
      :width="260"
      :breakpoint="767"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-expansion-item v-if="setAdmin" label="File Maintenance">
          <q-expansion-item v-if="setAdmin" icon="how_to_reg" label="Inspectors">
            <q-item v-if="setAdmin" to="/inspectors" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="how_to_reg" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Inspectors</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="setAdmin" to="/positions" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="playlist_add_check" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Positions</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="setAdmin" to="/special-skills" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="gavel" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Special Skills</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="setAdmin" to="/schedules" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="schedule" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Schedule</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item v-if="setAdmin" icon="build" label="Equipments">
            <q-item v-if="setAdmin" to="/equipment-category" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="category" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Equipment Category</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="setAdmin" to="/list-services" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="format_list_bulleted" />
              </q-item-section>
              <q-item-section>
                <q-item-label>List of Equipments</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item to="/mobilization" exact clickable v-if="setAdmin">
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Mobilization Fee</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="setAdmin" to="/users" exact clickable>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manage User</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="setAdmin" to="/scheduling" exact clickable>
            <q-item-section avatar>
              <q-icon name="schedule" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Scheduling</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="setAdmin" to="/checklists" exact clickable>
            <q-item-section avatar>
              <q-icon name="playlist_add_check" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Checklists</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item v-if="setAdmin" icon="description" label="Certificate">
            <q-item v-if="setAdmin" to="/certificates" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Certificates</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="setAdmin" to="/certificate-builder" exact clickable class="q-pl-xl">
              <q-item-section avatar>
                <q-icon name="post_add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Certificate Builder</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- <q-item  v-if="setAdmin" to="/safety-associate" exact clickable>
            <q-item-section avatar>
              <q-icon name="person_pin" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Safety Associate</q-item-label>
            </q-item-section>
          </q-item>-->
        </q-expansion-item>

        <q-item
          v-if="userDetails.roles=='old' || userDetails.roles=='new'"
          to="/services"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Equipments</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-item
          v-if="userDetails.roles=='old' || userDetails.roles=='new'"
          to="/reservation"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="userDetails.roles=='old' || userDetails.roles=='new'">My Calendar</q-item-label>
          </q-item-section>
        </q-item>-->

        <q-expansion-item
          v-if="setAdmin || userDetails.roles=='Inspector'"
          icon="assessment"
          label="Projects"
        >
          <q-item
            v-if="setAdmin || userDetails.roles=='Inspector'"
            to="/pending-projects"
            exact
            clickable
            class="q-pl-xl"
          >
            <q-item-section avatar>
              <q-icon name="flag" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="setAdmin || userDetails.roles=='Inspector'">Pending Projects</q-item-label>
              <!-- <q-item-label v-if="userDetails.roles=='old' || userDetails.roles=='new'">My Reservation</q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item
            v-if="setAdmin || userDetails.roles=='Inspector'"
            to="/approved-projects"
            exact
            clickable
            class="q-pl-xl"
          >
            <q-item-section avatar>
              <q-icon name="thumb_up_alt" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="setAdmin || userDetails.roles=='Inspector'">Approved Projects</q-item-label>
              <!-- <q-item-label v-if="userDetails.roles=='old' || userDetails.roles=='new'">My Reservation</q-item-label> -->
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item v-if="setAdmin || userDetails.roles=='Inspector'" to="/reservation" exact clickable>
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="setAdmin || userDetails.roles=='Inspector'">Project Calendar</q-item-label>

            <!-- <q-item-label v-if="userDetails.roles=='old' || userDetails.roles=='new'">My Calendar</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item
          v-if="userDetails.roles=='old' || userDetails.roles=='new'"
          to="/approved-projects"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <!-- <q-item-label v-if="setAdmin || userDetails.roles=='Inspector'">Reservation Table</q-item-label> -->
            <q-item-label v-if="userDetails.roles=='old' || userDetails.roles=='new'">My Projects</q-item-label>
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
import $ from "jquery";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fc, fs } from "boot/firebase";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";
export default {
  name: "MyLayout",
  mixins: [mixinOtherUserDetails],
  props: ["tab"],
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  data() {
    return {
      admin: false,
      profilePhoto: {},
      clientPreproposal: {},
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
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),
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
    ]),
    removeToCart(item) {
      this.$store.commit("storeservices/removeItemFromCart", item);
    },
    showMyCart() {
      let user = fb.auth().currentUser;
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          const admin = idTokenResult.claims.admin;
          if (admin == true) {
            this.admin = true;
          } else {
            this.$binding(
              "clientPreproposal",
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
  },
  mounted() {
    // $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?", function(
    //   data
    // ) {
    //   console.log(JSON.stringify(data, null, 2));
    //   console.log(JSON.stringify(data.geobytesremoteip));
    // });
    // console.log(window.location.protocol + "//" + window.location.host)
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
@media print {
  .header {
    display: none;
  }
  .side-drawer {
    display: none;
  }
  .footer {
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


