<template>
  <q-card class="bg-grey-4">
    <q-bar>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-stepper v-model="step" ref="stepper" contracted color="primary" animated>
      <q-step :name="1" title="Select campaign settings" icon="settings" :done="step > 1">
        <q-card-section class="row">
          <div class="text-h6">Inspection Results</div>
          <q-space></q-space>
          <div>Legend: Check=Satisfactory Uncheck=Not Satisfactory</div>
        </q-card-section>
        <q-item tag="label" v-ripple v-for="check in checklistTable.check" :key="check.id">
          <q-item-section side top>
            <q-checkbox v-model="check.status" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{check.name}}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-card-section class="q-pt-none">{{checklistTable.check}}</q-card-section> -->
        <q-btn
          round
          class="q-mt-md"
          @click="() => { done1 = true; step = 2 }"
          color="primary"
          icon="arrow_forward"
        />
      </q-step>
      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="emoji_flags"
        :done="step > 2"
      >
        <q-form @submit.prevent="fbSubmitForCertificate">
          <q-card flat class="my-card">
            <div class="text-h6">Equipment Data</div>
            <q-card-section class>
              <!-- <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.type"
                label="Type"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />-->
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.companyName"
                label="Company Name"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.model"
                label="Model"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.equipmentNumber"
                label="Number"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.serialNumber"
                label="Serial Number"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.power"
                label="Power"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.brand"
                label="Brand"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.year"
                label="Year"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.operatingWeight"
                label="Weight"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.bucketData"
                label="Bucket Data"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-input
                class="col q-mb-none q-pb-sm"
                v-model="equipmentData.volume"
                label="Volume"
                :rules="[val => !!val || 'Field is required']"
                lazy-rules
              />
              <q-select
                :rules="[val => !!val || 'Field is required']"
                v-model="equipmentData.result"
                class="col q-mb-none q-pb-sm"
                :options="passed"
                label="Passed or Failed"
              ></q-select>
            </q-card-section>
            <q-card-actions>
              <q-btn
                round
                v-if="step > 1"
                color="primary"
                @click="$refs.stepper.previous()"
                icon="arrow_back"
              />
              <q-space></q-space>
              <q-btn type="submit" color="primary" label="Submit"></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </q-step>
    </q-stepper>
  </q-card>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["checklistTable"],
  firestore() {
    return {
      printingCertificates: fs.collection("printingCertificates")
    };
  },
  data() {
    return {
      passed: ["SAFE FOR USE", "NOT SAFE FOR USE"],
      equipmentData: {
        type: "",
        model: "",
        equipmentNumber: "",
        serialNumber: "",
        power: "",
        brand: "",
        year: "",
        operatingWeight: "",
        bucketData: "",
        volume: "",
        result: "",
        companyName: ""
      },
      step: 1,
      dialog: false,
      maximizedToggle: true
    };
  },
  methods: {
    showchecklistResult() {
      // console.log(this.checklistTable.check); <<----This is working somehow
    },
    fbSubmitForCertificate() {
      var today = new Date();
      var year = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      year = mm;
      this.equipmentData.date = today;
      this.equipmentData.checklistNumber = today;
      this.equipmentData.certificateNumber =
        "CHECK" + "-" + Math.floor(Math.random() * 1000000000 + 1) + "-" + year;
      "CERT" + "-" + Math.floor(Math.random() * 1000000000 + 1) + "-" + year;

      this.$q.loading.show();
      let userID = fb.auth().currentUser.uid;
      this.equipmentData.createdBy = userID;
      this.equipmentData.type = this.checklistTable.equipment;
      this.equipmentData.checklist = this.checklistTable.check;

      this.$firestore.printingCertificates
        .add(this.equipmentData)
        .then(response => {
          this.$q.loading.hide();
          console.log(response);
        })
        .catch(error => {
          this.$q.loading.hide();
          console.log(error);
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>