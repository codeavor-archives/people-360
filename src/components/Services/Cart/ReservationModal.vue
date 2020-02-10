<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Reservation</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addReservation">
      <q-card-section>
        <!-- <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Add Equipment Type"
          v-model="services.serviceName"
        >
          <template v-slot:append>
            <q-icon v-if="services.serviceName" name="close" class="cursor-pointer" />
          </template>
        </q-input>-->
        <q-input
          v-model="preproposal.start"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          class="col q-mb-none q-pb-sm"
          label="Start Date"
        >
          <template v-slot:append>
            <q-icon v-if="preproposal.start" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" landscape v-model="preproposal.start" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="preproposal.end"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          class="col q-mb-none q-pb-sm"
          label="End Date"
        >
          <template v-slot:append>
            <q-icon v-if="preproposal.end" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" landscape v-model="preproposal.end" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <!-- <q-input
          v-model="preproposal.companyName"
          ref="name"
          class="col q-mb-none q-pb-sm"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          label="Company Name"
        ></q-input>
        <q-input
          v-model="preproposal.location"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col q-mb-none q-pb-sm"
          label="Location(Area)"
        ></q-input>-->
        <q-input
          type="number"
          v-model="preproposal.quantity"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col q-mb-none q-pb-sm"
          label="Quantity"
        ></q-input>
        <q-select
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          class="col"
          :options="optionsReport"
          v-model="preproposal.optionReport"
          label="With Report?"
        ></q-select>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Make Reservation" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["services"],
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  data() {
    return {
      optionsReport: ["Yes", "No"],
      preproposal: {
        id: "",
        allDay: "true",
        color: "#027be3",
        start: "",
        end: "",
        title: "",
        date: "",
        proposalNumber: "",
        companyName: "",
        location: "",
        optionReport: "",
        quantity: "",
        equipment: "",
        name: "",
        price: "",
        serviceID: "",
        photo: "",
        personCount: ""
      }
    };
  },
  methods: {
    addReservation() {
      console.log(this.services);
      this.$q.loading.show();

      let userID = fb.auth().currentUser.uid;
      this.preproposal.id = userID;

      var today = new Date();
      var year = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      this.preproposal.date = today;
      year = mm;
      this.preproposal.proposalNumber =
        "RN" +
        "-" +
        "IN" +
        "-" +
        Math.floor(Math.random() * 1000000000 + 1) +
        "-" +
        year;
      this.preproposal.price = this.services.servicePrice;
      this.preproposal.serviceID = this.services.serviceID;
      this.preproposal.name = this.services.serviceName;
      this.preproposal.photo = this.services.servicePhoto;
      this.preproposal.equipment = this.services.serviceEquipment;
      this.preproposal.personCount = this.services.servicePersonCount;
      this.preproposal.companyName = this.userDetails.companyName;
      this.preproposal.location = this.userDetails.companyLocation;
      if (this.preproposal.optionReport === "Yes") {
        this.preproposal.optionReport = true;
      }
      this.preproposal.title =
        this.userDetails.companyName +
        " " +
        this.services.serviceEquipment +
        " " +
        this.userDetails.companyLocation;
      this.$firestore.preproposals
        .add(this.preproposal)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Success",
            message: "Please wait for confirmation",
            persistent: true
          });
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
      this.$emit("close");
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"])
  }
};
</script>

<style>
</style>