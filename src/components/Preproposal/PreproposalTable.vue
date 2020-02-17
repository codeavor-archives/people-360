<template>
  <q-page>
    <div class>
      <template v-if="setAdmin || userDetails.roles=='Inspector'">
        <div class>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="15">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 text-primary">Reservation Table</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Pre-Proposal Number</th>
                <th class="text-left">Company Name</th>
                <th class="text-left">Full Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Start Date</th>
                <th class="text-left">Equipment</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Total Price</th>
                <th class="text-left">Location</th>
                <th class="text-left">Name</th>
                <th class="text-left">Report</th>
                <th class="text-left">Status</th>
                <th class="text-left" v-if="setAdmin">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="category in equipmentCategories" :key="category.id"> -->
              <tr v-for="proposal in clientPreproposals" :key="proposal.id">
                <td class="text-left">{{proposal.proposalNumber}}</td>
                <td class="text-left">{{proposal.companyName}}</td>
                <td class="text-left">{{proposal.fullName}}</td>
                <td class="text-left">{{proposal.date}}</td>
                <td class="text-left">{{proposal.start}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="equipment in proposal.itemPurchase"
                        :key="equipment.id"
                      >{{equipment.service_equipment}}</q-card-section>
                    </div>
                  </div>
                </td>

                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="price in proposal.itemPurchase"
                        :key="price.id"
                      >{{price.service_price | currency("₱", 2, { decimalSeparator: "." })}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <div class="row">
                    <div class="row">
                      <div class="row">
                        <q-card-section
                          v-for="(quantity, index) in proposal.itemPurchase"
                          :key="quantity.id"
                        >
                          {{quantity.service_quantity}}
                          <!-- <q-btn
                            color="primary"
                            class
                            dense
                            round
                            icon="edit"
                            size="8px"
                            flat
                            @click="deleteQuantity(quantity, index)"
                          ></q-btn>-->
                        </q-card-section>
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  class="text-left"
                >{{proposal.totalPrice | currency("₱", 2, { decimalSeparator: "." })}}</td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="name in proposal.itemPurchase"
                        :key="name.id"
                      >{{name.service_name}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                  >{{proposal.optionReport ? 'Yes': 'No' }}</q-badge>
                </td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.status ? 'green-7' : 'orange-7'"
                  >{{proposal.status ? 'Approved': 'For Approval' }}</q-badge>
                </td>
                <td class="text-left">
                  <!-- <q-btn
                    @click="showEditProposal(proposal)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="edit"
                  ></q-btn>-->
                  <q-btn
                    @click="approvedProposal(proposal)"
                    v-if="!proposal.status"
                    round
                    color="primary"
                    flat
                    dense
                    icon="thumb_up_alt"
                  >
                    <q-tooltip content-class="bg-accent">Reserved</q-tooltip>
                  </q-btn>
                  <q-btn
                    @click="approvedProposal(proposal)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="thumb_down_alt"
                  >
                    <q-tooltip content-class="bg-red">Cancel</q-tooltip>
                  </q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </template>
      <template v-else>
        <div class>
          <template v-if="clientPreproposal.length">
            <div class="row items-start">
              <div
                v-for="proposal in clientPreproposal"
                :key="proposal.id"
                class="col-md-6 col-xl-4 col-lg-6 col-xs-12 col-sm-12"
              >
                <q-card class="q-ma-xs">
                  <q-card-section>
                    <div class="row no-wrap items-center">
                      <div class="col">
                        <strong>Proposal Number:</strong>
                        {{proposal.proposalNumber}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <strong>Start Date:</strong>
                        {{proposal.start}}
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-actions class="q-pt-none">
                    <q-space></q-space>
                    <q-btn
                      @click="expanded = !expanded"
                      dense
                      flat
                      color="primary"
                      round
                      :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                    >
                      <q-tooltip content-class="bg-deep-orange">See More</q-tooltip>
                    </q-btn>
                  </q-card-actions>
                  <q-slide-transition>
                    <div v-show="expanded">
                      <q-separator />
                      <q-card-section class="q-pt-none">
                        <div class="row">
                          <q-card-section class="q-pa-none">
                            <div v-for="equipment in proposal.itemPurchase" :key="equipment.id">
                              <strong>Equipments:</strong>
                              {{equipment.service_equipment}}
                            </div>
                            <div v-for="quantity in proposal.itemPurchase" :key="quantity.id">
                              <strong>Quantity:</strong>
                              {{quantity.service_quantity}}
                            </div>
                            <div v-for="price in proposal.itemPurchase" :key="price.id">
                              <strong>Price:</strong>
                              {{price.service_price | currency("₱", 2, { decimalSeparator: "." })}}
                            </div>
                          </q-card-section>
                        </div>
                        <div class="text-subtitle1">
                          <strong>Total Price:</strong>
                          {{proposal.totalPrice | currency("₱", 2, { decimalSeparator: "." })}}
                        </div>
                      </q-card-section>
                    </div>
                  </q-slide-transition>
                </q-card>
              </div>
              <!-- <q-dialog v-model="showDetails">
              <show-details @close="showDetails = false" :service="service" :id="id"></show-details>
              </q-dialog>-->
            </div>
          </template>
          <template v-else>
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut absolute-top"
            >
              <q-banner class="fixed-center">
                <template v-slot:avatar class="absolute">
                  <span>
                    No Reservation
                    <q-spinner-dots size="1em" color="primary" />
                    <q-spinner-hourglass size="2em" color="primary" />
                  </span>
                </template>
              </q-banner>
            </transition>
          </template>

          <!-- <q-markup-table>
            <thead>
              <tr>
                <th colspan="15">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 text-primary">Reservation Table</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Pre-Proposal Number</th>
                <th class="text-left">Company Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Start Date</th>
                <th class="text-left">Equipment</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Total Price</th>
                <th class="text-left">Location</th>
                <th class="text-left">Name</th>
                <th class="text-left">Report</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="proposal in clientPreproposal" :key="proposal.proposalNumber">
                <td class="text-left">{{proposal.proposalNumber}}</td>
                <td class="text-left">{{proposal.companyName}}</td>
                <td class="text-left">{{proposal.date}}</td>
                <td class="text-left">{{proposal.start}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="equipment in proposal.itemPurchase"
                        :key="equipment.id"
                      >{{equipment.service_equipment}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="price in proposal.itemPurchase"
                        :key="price.id"
                      >{{price.service_price | currency("₱", 2, { decimalSeparator: "." })}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="quantity in proposal.itemPurchase"
                        :key="quantity.id"
                      >{{quantity.service_quantity}}</q-card-section>
                    </div>
                  </div>
                </td>

                <td
                  class="text-left"
                >{{proposal.totalPrice | currency("₱", 2, { decimalSeparator: "." })}}</td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="name in proposal.itemPurchase"
                        :key="name.id"
                      >{{name.service_name}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                  >{{proposal.optionReport ? 'Yes': 'No' }}</q-badge>
                </td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.status ?'green-7' : 'orange-7'"
                  >{{proposal.status ? 'Approved': 'For Approval' }}</q-badge>
                </td>
                <td class="text-left" v-if="setAdmin">
                  <q-btn round color="primary" flat dense icon="edit"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>-->
        </div>
      </template>
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
    </div>
    <q-dialog v-model="editProposal">
      <edit-proposal @close="editProposal = false" :proposals="proposals" :id="id"></edit-proposal>
    </q-dialog>
  </q-page>
</template>

<script>
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  data() {
    return {
      expanded: false,
      slide: 1,
      editProposal: false,
      admin: false,
      clientPreproposals: {},
      clientPreproposal: {},
      proposals: {},
      id: ""
    };
  },
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  methods: {
    deleteQuantity(quantity, index) {
      // console.log(quantity);
      // console.log(index);
    },
    approvedProposal(proposal) {
      // console.log(proposal.id);
      this.$q.loading.show();
      // this.proposal.status = true;
      this.$firestore.preproposals
        .doc(proposal.id)
        .update({
          status: true
        })
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully approved reservation",
            color: "primary",
            multiLine: true,
            actions: [
              {
                label: "Dismiss",
                color: "white",
                handler: () => {}
              }
            ]
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
        });
    },
    showEditProposal(proposal) {
      this.editProposal = true;
      this.proposals = proposal;
      this.id = proposal.id;
      // console.log(proposal.itemPurchase);
    }
  },
  mounted() {
    let user = fb.auth().currentUser;
    let clientData = [];
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        // console.log(admin);
        if (admin == true) {
          // this.admin = true;
          // this.$binding(
          //   "clientPreproposals",
          //   fs
          //     .collection("preproposals")
          //     .where("status", "==", true)
          //     .orderBy("date")
          // );
          this.$binding(
            "clientPreproposals",
            fs.collection("preproposals").orderBy("date")
          );
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
  },
  components: {
    "edit-proposal": require("components/Preproposal/Modals/EditPreproposal")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>