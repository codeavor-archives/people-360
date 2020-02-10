<template>
  <q-page>
    <div class>
      <template v-if="admin">
        <div class>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="10">
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
                <th class="text-left" v-if="setAdmin">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="category in equipmentCategories" :key="category.id"> -->
              <tr v-for="proposal in preproposals" :key="proposal.id">
                <td class="text-left">{{proposal.proposalNumber}}</td>
                <td class="text-left">{{proposal.companyName}}</td>
                <td class="text-left">{{proposal.date}}</td>
                <td class="text-left">{{proposal.equipment.equipment}}</td>
                <td class="text-left">{{proposal.quantity.quantity}}</td>
                <td class="text-left">{{proposal.service_price.price}}</td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">{{proposal.name.name}}</td>
                <td class="text-left">
                  <q-badge
                    :color="proposal.optionReport ? 'green-7' : 'grey-4'"
                  >{{proposal.optionReport ? 'Yes': 'No' }}</q-badge>
                </td>
                <td class="text-left">
                  <q-btn round color="primary" flat dense icon="edit"></q-btn>
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
                <td class="text-left">{{proposal.equipment.equipment}}</td>
                <td class="text-left">{{proposal.quantity.quantity}}</td>
                <td class="text-left">{{proposal.service_price.price}}</td>
                <td class="text-left">{{proposal.location}}</td>
                <td class="text-left">{{proposal.name.name}}</td>
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
    <!-- <q-dialog v-model="showEditType">
      <edit-category @close="showEditType = false" :equipmentCategory="equipmentCategory" :id="id"></edit-category>
    </q-dialog>-->
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  data() {
    return {
      admin: false,
      clientPreproposal: []
    };
  },
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  mounted() {
    let user = fb.auth().currentUser;
    let clientData = [];
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        // console.log(admin);
        if (admin == true) {
          this.admin = true;
        } else {
          let dataRef = fs.collection("preproposals");
          let clientRef = dataRef
            .where("id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                // console.log(doc.data());
                // this.clientPreproposal = doc.data();
                clientData.push(doc.data());
              });
            })
            .catch(err => {
              console.log("Error getting documents", err);
            });
          this.clientPreproposal = clientData;
        }
      });
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style>
</style>