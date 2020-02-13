<template>
  <q-page>
    <!-- <template></template> -->
    <div class="row items-start">
      <div v-for="proposal in clientPreproposals" :key="proposal.id" class="col-6">
        <q-card class="q-ma-xs bg-grey-2">
          <q-card-section>
            <div class="text-h6">{{proposal.companyName}}</div>
          </q-card-section>
          <q-card-section class>{{proposal.date}}</q-card-section>
          <div class="row">
            <div>
              <q-card-section v-for="name in proposal.name" :key="name.id">{{name}}</q-card-section>
            </div>
            <div>
              <q-card-section v-for="name in proposal.name" :key="name.id">{{name}}</q-card-section>
            </div>
            <div>
              <q-card-section v-for="name in proposal.name" :key="name.id">{{name}}</q-card-section>
            </div>
          </div>
          <q-card-actions>
            <q-btn flat color="primary" @click="expanded = !expanded" label="View" />
            <q-space />

            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="col">lorem</q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      preproposals: fs.collection("preproposals"),
      users: fs.collection("users")
    };
  },
  data() {
    return {
      expanded: false,
      users: {},
      clientReservation: {},
      clientPreproposals: {}
    };
  },

  mounted() {
    let user = fb.auth().currentUser;
    let clientData = [];
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const admin = idTokenResult.claims.admin;
        if (admin == true) {
          // this.admin = true;
          this.$binding(
            "clientPreproposals",
            fs.collection("preproposals").orderBy("date")
          );
          // this.$binding(
          //   "users",
          //   fs.collection("users").where("").orderBy("companyName")
          // );
        } else {
          this.$binding(
            "clientReservation",
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
  }
};
</script>

<style>
</style>