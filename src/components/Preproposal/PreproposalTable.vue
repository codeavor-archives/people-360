<template>
  <q-page>
    <div class>
      <template v-if="setAdmin">
        <div class>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="15">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 text-primary">Pre Proposals Table</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Pre-Proposal Number</th>
                <th class="text-left">Company Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Start Date</th>
                <th class="text-left">Equipment</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Price</th>
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
                <td class="text-left">{{proposal.date}}</td>
                <td class="text-left">{{proposal.start}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="equipment in proposal.equipment"
                        :key="equipment.id"
                      >{{equipment}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="quantity in proposal.quantity"
                        :key="quantity.id"
                      >{{quantity}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section
                        v-for="price in proposal.service_price"
                        :key="price.id"
                      >{{price}}</q-card-section>
                    </div>
                  </div>
                </td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">
                  <div class="row">
                    <div>
                      <q-card-section v-for="name in proposal.name" :key="name.id">{{name}}</q-card-section>
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
                  >{{proposal.status ? 'Approved': 'For Quotation' }}</q-badge>
                </td>
                <td class="text-left">
                  <q-btn
                    @click="showEditProposal(proposal)"
                    round
                    color="primary"
                    flat
                    dense
                    icon="edit"
                  ></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </template>
      <template v-else>
        <div class>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="12">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 text-primary">Pre Proposals Table</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Pre-Proposal Number</th>
                <th class="text-left">Company Name</th>
                <th class="text-left">Date</th>
                <th class="text-left">Equipment</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Price</th>
                <th class="text-left">Location</th>
                <th class="text-left">Name</th>
                <th class="text-left">Report</th>
                <th class="text-left">Status</th>
                <th class="text-left" v-if="setAdmin">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="category in equipmentCategories" :key="category.id"> -->
              <tr v-for="proposal in clientPreproposal" :key="proposal.proposalNumber">
                <td class="text-left">{{proposal.proposalNumber}}</td>
                <td class="text-left">{{proposal.companyName}}</td>
                <td class="text-left">{{proposal.date}}</td>
                <td class="text-left">{{proposal.equipment}}</td>
                <td class="text-left">{{proposal.quantity}}</td>
                <td class="text-left">{{proposal.price}}</td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">{{proposal.name}}</td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                  >{{proposal.optionReport ? 'Yes': 'No' }}</q-badge>
                </td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                  >{{proposal.optionReport ? 'For Approval': 'Approved' }}</q-badge>
                </td>
                <td class="text-left" v-if="setAdmin">
                  <q-btn round color="primary" flat dense icon="edit"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
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
    showEditProposal(proposal) {
      this.editProposal = true;
      this.proposals = proposal;
      this.id = proposal.id;
      // console.log(proposal.id);
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
          this.$binding(
            "clientPreproposals",
            fs.collection("preproposals").orderBy("companyName")
          );
        } else {
          this.$binding(
            "clientPreproposal",
            fs
              .collection("preproposals")
              .where("id", "==", user.uid)
              .orderBy("companyName")
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