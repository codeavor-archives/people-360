<template>
  <q-page>
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="20">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Ongoing Projects Table</div>
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
                      >{{ quantity.service_quantity }}</q-card-section>
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
                <q-badge color="orange-7" v-if="proposal.status == 'pending'">Pending</q-badge>
                <q-badge color="green-7" v-if="proposal.status == 'approved'">Approved</q-badge>
                <q-badge color="orange-7" v-if="proposal.status == 'ongoing'">On-Going</q-badge>
                <q-badge color="orange-7" v-if="proposal.status == 'done'">Done</q-badge>
              </td>
              <td class="text-left">
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

                <q-btn round color="primary" flat dense icon="assignment_turned_in">
                  <q-tooltip content-class="bg-red">For Inspection</q-tooltip>
                </q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  data() {
    return {
      clientPreproposals: {}
    };
  },
  mounted() {
    this.$binding(
      "clientPreproposals",
      fs
        .collection("preproposals")
        .where("status", "==", "ongoing")
        .orderBy("start")
    );
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>