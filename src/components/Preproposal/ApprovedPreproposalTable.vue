<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh">
      <div class>
        <template v-if="setAdmin || userDetails.roles == 'Inspector'">
          <div class>
            <q-markup-table>
              <thead>
                <tr>
                  <th colspan="20">
                    <div class="row no-wrap items-center">
                      <div class="text-h5 text-primary">Approved Reservation Table</div>
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
                  <th class="text-left">Mobilization Fee</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Total Equipment Price</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total Price</th>
                  <th class="text-left">Project Location</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Report</th>
                  <th class="text-left">Status</th>
                  <th class="text-left" v-if="setAdmin">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="proposal in clientPreproposals" :key="proposal.id">
                  <td class="text-left">{{ proposal.proposalNumber }}</td>
                  <td class="text-left">{{ proposal.companyName }}</td>
                  <td class="text-left">{{ proposal.fullName }}</td>
                  <td class="text-left">{{ proposal.date }}</td>
                  <td class="text-left">{{ proposal.start }}</td>
                  <td class="text-left">
                    <div class="row">
                      <div>
                        <q-card-section
                          v-for="equipment in proposal.itemPurchase"
                          :key="equipment.id"
                        >{{ equipment.service_equipment }}</q-card-section>
                      </div>
                    </div>
                  </td>
                  <td class="text-right">
                    {{
                    proposal.mobilizationFee
                    | currency("₱", 2, { decimalSeparator: "." })
                    }}
                  </td>
                  <td class="text-right">
                    <div class="row">
                      <div>
                        <q-card-section v-for="price in proposal.itemPurchase" :key="price.id">
                          {{
                          price.service_price
                          | currency("₱", 2, { decimalSeparator: "." })
                          }}
                        </q-card-section>
                      </div>
                    </div>
                  </td>
                  <td class="text-right">
                    {{
                    proposal.totalEquipmentPrice
                    | currency("₱", 2, { decimalSeparator: "." })
                    }}
                  </td>
                  <td class="text-left">
                    <div class="row">
                      <div class="row">
                        <div class="row">
                          <q-card-section
                            v-for="(quantity, index) in proposal.itemPurchase"
                            :key="quantity.id"
                          >
                            {{ quantity.service_quantity }}
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
                  <td class="text-right">
                    {{
                    proposal.totalPrice
                    | currency("₱", 2, { decimalSeparator: "." })
                    }}
                  </td>
                  <td class="text-left">{{ proposal.location }}</td>
                  <td class="text-left">
                    <div class="row">
                      <div>
                        <q-card-section
                          v-for="name in proposal.itemPurchase"
                          :key="name.id"
                        >{{ name.service_name }}</q-card-section>
                      </div>
                    </div>
                  </td>
                  <td class="text-left">
                    <q-badge
                      :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                    >{{ proposal.optionReport ? "Yes" : "No" }}</q-badge>
                  </td>
                  <td class="text-left">
                    <!-- <q-badge :color="proposal.status ? 'green-7' : 'orange-7'">
                      {{
                      proposal.status ? "Reserved" : "For Approval"
                      }}
                    </q-badge>-->
                    <q-badge color="orange-7" v-if="proposal.status == 'pending'">Pending</q-badge>
                    <q-badge color="green-7" v-if="proposal.status == 'approved'">Approved</q-badge>
                    <q-badge color="orange-7" v-if="proposal.status == 'ongoing'">On-Going</q-badge>
                    <q-badge color="orange-7" v-if="proposal.status == 'done'">Done</q-badge>
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

                    <!-- <q-btn
                      @click="approvedProposal(proposal)"
                      round
                      color="primary"
                      flat
                      dense
                      icon="thumb_up_alt"
                    >
                      <q-tooltip content-class="bg-accent">Reserved</q-tooltip>
                    </q-btn>-->
                    <q-btn
                      @click="cancelProposal(proposal)"
                      round
                      color="primary"
                      flat
                      dense
                      icon="thumb_down_alt"
                    >
                      <q-tooltip content-class="bg-red">Cancel</q-tooltip>
                    </q-btn>
                    <view-quotation :proposalId="proposal.id"></view-quotation>
                    <q-btn
                      round
                      color="primary"
                      flat
                      dense
                      icon="add"
                      @click="assignInspector(proposal)"
                    >
                      <q-tooltip content-class="bg-red">Add Inspector</q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <!-- <q-table
            :filter="filter"
            title="Approved Proposal Table"
            color="primary"
            :data="preproposals"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="proposalNumber">{{props.row.proposalNumber}}</q-td>
                <q-td :props="props" key="companyName">{{props.row.companyName}}</q-td>
                <q-td :props="props" key="fullName">{{props.row.fullName}}</q-td>
                <q-td :props="props" key="date">{{props.row.date}}</q-td>
                <q-td :props="props" key="start">{{props.row.start}}</q-td>
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="equipment in props.row.itemPurchase"
                      :key="equipment.service_equipment"
                    >
                      <q-card-section>{{equipment.service_equipment}}</q-card-section>
                    </div>
                  </div>
                </q-td>

                <q-td :props="props" key="mobilizationFee">{{props.row.mobilizationFee}}</q-td>
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="price in props.row.itemPurchase"
                      :key="price.service_price"
                    >
                      <q-card-section>{{price.service_price}}</q-card-section>
                    </div>
                  </div>
                </q-td>
                <q-td :props="props" key="totalEquipmentPrice">{{props.row.totalEquipmentPrice}}</q-td>

                Theres an error there
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="quantity in props.row.itemPurchase"
                      :key="quantity.service_quantity"
                    >
                      <q-card-section>{{quantity.service_quantity}}</q-card-section>
                    </div>
                  </div>
                </q-td>
                Theres an error there

                <q-td :props="props" key="totalPrice">{{props.row.totalPrice}}</q-td>
                <q-td :props="props" key="location">{{props.row.location}}</q-td>
                <q-td>
                  <div class="row">
                    <div
                      :props="props"
                      v-for="name in props.row.itemPurchase"
                      :key="name.service_name"
                    >
                      <q-card-section>{{name.service_name}}</q-card-section>
                    </div>
                  </div>
                </q-td>
                <q-td :props="props" key="optionReport">
                  <q-badge
                    :color="props.row.optionReport ? 'green-7' : 'grey-4'"
                  >{{props.row.optionReport ? 'Yes': 'No' }}</q-badge>
                </q-td>
                <q-td :props="props" key="status">
                  <q-badge
                    :color="props.row.status ?'green-7' : 'orange-7'"
                  >{{props.row.status ? 'Approved': 'For Approval' }}</q-badge>
                </q-td>
                <q-td v-if="setAdmin">
                  <q-btn
                    @click="showEditProposal(proposal)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="edit"
                  ></q-btn>
                  <q-btn
                    @click="approvedProposal(props.row)"
                    v-if="!props.row.status"
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
                </q-td>
              </q-tr>
            </template>
            </q-table>-->
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
                      <div>
                        <!-- <chartjs-doughnut
                        :labels="labels"
                        :datasets="datasets"
                        :option="option"
                        ></chartjs-doughnut>-->
                      </div>
                      <div class="row no-wrap items-center">
                        <div class="col">
                          <strong>Proposal Number:</strong>
                          {{ proposal.proposalNumber }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <q-circular-progress
                            show-value
                            font-size="12px"
                            :value="value"
                            size="50px"
                            :thickness="0.22"
                            color="teal"
                            track-color="grey-3"
                            class="absolute"
                            style="top: 10px; right: 12px; transform: translateY(-50%); transform: translateX(-0%)"
                          >{{ value }}%</q-circular-progress>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <strong>Start Date:</strong>
                          {{ proposal.start }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <strong>Project Location:</strong>
                          {{ proposal.projectLocation }}
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-actions class="q-pt-none">
                      <!-- <q-badge :color="proposal.status ? 'green-7' : 'orange-7'">
                        {{
                        proposal.status
                        ? "Reserved"
                        : "Proceed for Downpayment"
                        }}
                      </q-badge>-->
                      <q-badge color="orange-7" v-if="proposal.status == 'pending'">Pending</q-badge>
                      <q-badge color="green-7" v-if="proposal.status == 'approved'">Approved</q-badge>
                      <q-badge color="orange-7" v-if="proposal.status == 'ongoing'">On-Going</q-badge>
                      <q-badge color="orange-7" v-if="proposal.status == 'done'">Done</q-badge>

                      <q-input
                        class="col-6"
                        v-model="paymentSlip"
                        @change="uploadSlip"
                        dense
                        v-if="proposal.status == 'pending'"
                        @input="
                          val => {
                            file = val[0];
                          }
                        "
                        type="file"
                      >
                        <template v-slot:append>
                          <q-circular-progress
                            show-value
                            class="text-light-blue q-ma-md"
                            :value="slipValue"
                            size="30px"
                            color="primary"
                          />
                        </template>
                      </q-input>

                      <q-btn
                        @click="uploadPaymentSlip(proposal)"
                        round
                        v-if="readytosubmit && proposal.status == 'pending'"
                        dense
                        size="sm"
                        flat
                        icon="save"
                        color="primary"
                      ></q-btn>
                      <!-- <q-btn
                        no-caps
                        size="sm"
                        color="primary"
                        dense
                        label="Proceed for Downpayment"
                      >
                        <q-tooltip content-class="bg-deep-orange">Pay</q-tooltip>
                      </q-btn>-->
                      <q-space></q-space>
                      <q-btn
                        @click="payDownPayment(proposal)"
                        size="sm"
                        round
                        color="primary"
                        dense
                        icon="payment"
                      ></q-btn>

                      <q-btn
                        @click="expanded = !expanded"
                        dense
                        flat
                        color="primary"
                        round
                        :icon="
                          expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
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
                                {{ equipment.service_equipment }}
                              </div>
                              <div>
                                <strong>Slip:</strong>
                                <q-avatar rounded>
                                  <img
                                    style="cursor: pointer;"
                                    @click="showImage(proposal)"
                                    avatar
                                    :src="proposal.paymentSlip"
                                  />
                                </q-avatar>
                              </div>
                              <div v-for="quantity in proposal.itemPurchase" :key="quantity.id">
                                <strong>Quantity:</strong>
                                {{ quantity.service_quantity }}
                              </div>
                              <div v-for="price in proposal.itemPurchase" :key="price.id">
                                <strong>Price:</strong>
                                {{
                                price.service_price
                                | currency("₱", 2, {
                                decimalSeparator: "."
                                })
                                }}
                              </div>
                              <div>
                                <strong>Mobilization Fee:</strong>
                                {{
                                proposal.mobilizationFee
                                | currency("₱", 2, {
                                decimalSeparator: "."
                                })
                                }}
                              </div>

                              <div>
                                <strong>Total Equipment Price:</strong>
                                {{
                                proposal.totalEquipmentPrice
                                | currency("₱", 2, {
                                decimalSeparator: "."
                                })
                                }}
                              </div>
                            </q-card-section>
                          </div>
                          <div class>
                            <strong>Total Price:</strong>
                            {{
                            proposal.totalPrice
                            | currency("₱", 2, { decimalSeparator: "." })
                            }}
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
      <q-dialog v-model="showAddInspectorSched">
        <add-inspector-schedule
          :proposaltoPass="proposaltoPass"
          @close="showAddInspectorSched = false"
        ></add-inspector-schedule>
      </q-dialog>
      <q-dialog v-model="showPaymentSlipModal">
        <show-payment-slip @close="showPaymentSlipModal = false" :proposals="proposals" :id="id"></show-payment-slip>
      </q-dialog>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
// window.Stripe("pk_test_HQOiUEejQKbAx0vr1tl8UJbB00Mh4SGVyE");
import axios from "axios";
// import chartjsdoughnut from 'boot/Charts'
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fs } from "boot/firebase";
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      showPaymentSlipModal: false,
      session: "",
      showAddInspectorSched: false,
      slipValue: null,
      paymentSlip: "",
      readytosubmit: false,
      slip: false,
      value: 81,
      labels: ["Done", "On-Progress"],
      datasets: [
        {
          data: [80, 20],
          backgroundColor: ["Green", "Red"]
        }
      ],
      option: {
        title: {
          display: true,
          position: "bottom",
          text: "Done"
        }
      },
      filter: "",
      columns: [
        {
          name: "proposalNumber",
          align: "left",
          label: "Pre-Proposal Number",
          sortable: true,
          field: "proposalNumber"
        },
        {
          name: "companyName",
          align: "left",
          label: "Company Name",
          sortable: true,
          field: "companyName"
        },
        {
          name: "fullName",
          align: "left",
          label: "Full Name",
          sortable: true,
          field: "fullName"
        },
        {
          name: "date",
          align: "left",
          label: "Date",
          sortable: true,
          field: "date"
        },
        {
          name: "start",
          align: "left",
          label: "Start Date",
          sortable: true,
          field: "start"
        },
        {
          name: "itemPurchase",
          align: "left",
          label: "Equipment",
          sortable: true,
          field: "itemPurchase"
        },
        {
          name: "mobilizationFee",
          align: "right",
          label: "Mobilization Fee",
          sortable: true,
          field: "mobilizationFee"
        },
        {
          name: "itemPurchase.service_price",
          align: "right",
          label: "Price",
          sortable: true,
          field: "itemPurchase.service_price"
        },
        {
          name: "totalEquipmentPrice",
          align: "right",
          label: "Total Equipment Price",
          sortable: true,
          field: "totalEquipmentPrice"
        },
        {
          name: "itemPurchase.service_quantity",
          align: "left",
          label: "Quantity",
          sortable: true,
          field: "itemPurchase.service_quantity"
        },
        {
          name: "totalPrice",
          align: "left",
          label: "Total Price",
          sortable: true,
          field: "totalPrice"
        },
        {
          name: "location",
          align: "left",
          label: "Project Location",
          sortable: true,
          field: "location"
        },
        {
          name: "itemPurchase.service_name",
          align: "left",
          label: "Name",
          sortable: true,
          field: "itemPurchase.service_name"
        },
        {
          name: "optionReport",
          align: "left",
          label: "Report",
          sortable: true,
          field: "optionReport"
        },
        {
          name: "status",
          align: "left",
          label: "Status",
          sortable: true,
          field: "status"
        },
        {
          align: "left",
          label: "Action"
        }
      ],
      expanded: false,
      slide: 1,
      editProposal: false,
      admin: false,
      clientPreproposals: {},
      clientPreproposal: {},
      proposaltoPass: {},
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
    payDownPayment(proposal) {
      console.log(proposal);
      // let data = this.proposal.map(item => ({
      //   [item.service_Id]: item.service_quantity
      // }
      // const stripe = Stripe("pk_test_HQOiUEejQKbAx0vr1tl8UJbB00Mh4SGVyE");

      // window.Stripe("pk_test_HQOiUEejQKbAx0vr1tl8UJbB00Mh4SGVyE");
      // data = Object.assign({}, ...data);
      axios
        .get(
          // "https://us-central1-e-commerce-77d42.cloudfunctions.net/checkout",
          "https://us-central1-asset-management-5f4bd.cloudfunctions.net/checkout",
          {
            params: {
              products: proposal //this data will be the parameter to send to the server in index.js
            }
          }
        )
        .then(response => {
          this.session = response.data;
          console.log(response.data);
          stripe
            .redirectToCheckout({
              sessionId: this.session.id
            })
            .then(function(result) {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    showImage(proposal) {
      // console.log(proposal);
      this.showPaymentSlipModal = true;
      this.proposals = proposal;
    },
    mountAllCollections() {
      let user = fb.auth().currentUser;
      let clientData = [];
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          const admin = idTokenResult.claims.admin;
          // console.log(admin);
          if (admin == true || this.userDetails.roles == "Inspector") {
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
              fs
                .collection("preproposals")
                .where("status", "==", "approved")
                .orderBy("start")
            );
          } else {
            this.$binding(
              "clientPreproposal",
              fs
                .collection("preproposals")
                .where("id", "==", user.uid)
                .orderBy("start")
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
    refresh(done) {
      setTimeout(() => {
        this.mountAllCollections();
        done();
      }, 500);
    },
    assignInspector(proposal) {
      this.showAddInspectorSched = true;
      this.proposaltoPass = proposal;
    },
    passProposal(proposal) {
      // console.log(proposal);
      this.proposaltoPass = proposal;
    },
    uploadPaymentSlip(proposal) {
      // console.log(proposal);
      this.$q.loading.show();
      this.$firestore.preproposals
        .doc(proposal.id)
        .update({ paymentSlip: this.paymentSlip })
        .then(response => {
          this.paymentSlip = null;
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully uploaded payment slip",
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
      this.paymentSlip = "";
      this.slipValue = null;
      this.readytosubmit = false;
    },
    uploadSlip(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("payment/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.slipValue = progress;
          },
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              // console.log(downloadURL);
              this.paymentSlip = downloadURL;
              this.readytosubmit = true;
            });
          }
        );
      }
    },
    attachedSlip() {
      this.slip = true;
    },
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
    },
    countDownTimer() {
      let count = this.clientPreproposals.start;
      var time = new Date(count).getTime;
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  },
  mounted() {
    this.countDownTimer();
    // var countDownDate = new Date().getTime();
    // var x = setInterval(() => {
    //   var now = new Date().getTime();

    //   var distance = countDownDate - now;
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor(
    //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //   );
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   const date = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    //   console.log(date);

    //   if (distance < 0) {
    //     clearInterval(x);
    //     console.log("Expired");
    //   }
    // }, 1000);

    let user = fb.auth().currentUser;
    let clientData = [];
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        // console.log(admin);
        if (admin == true || this.userDetails.roles == "Inspector") {
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
            fs
              .collection("preproposals")
              .where("status", "==", "approved")
              .orderBy("start")
          );
        } else {
          this.$binding(
            "clientPreproposal",
            fs
              .collection("preproposals")
              .where("id", "==", user.uid)
              .orderBy("start")
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
      .default,
    "view-quotation": require("components/Preproposal/Actions/View").default,
    "add-inspector-schedule": require("components/Inspector/Modal/AddInspectorSchedule")
      .default,
    "show-payment-slip": require("components/Preproposal/Modals/PaymentViewer")
      .default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),
    countDown() {
      return this.clientPreproposals.start;
    }
  }
};
</script>

<style></style>
