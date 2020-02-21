<template>
  <q-page>
    <q-card-actions class>
      <q-item-label class="q-ml-md">
        <q-item-label class="col text-justify q-pb-xs">
          <strong>1.</strong>
          If there's a Lifting Equipment, test weight for load testing, as well as necessary equipment for moving the test weights will be provided by the
          <strong>{{this.userDetails.companyName}}</strong>
        </q-item-label>
        <q-item-label class="col text-justify q-pb-xs">
          <strong>2.</strong>
          <strong>{{this.userDetails.companyName}}</strong> will provide a counterpart Safety Officer who will be the dedicated Liason Officer to coordinate with the other concerned parties within its organization.
        </q-item-label>
        <q-item-label class="col text-justify q-pb-xs">
          <strong>3.</strong>
          <strong>All equipment inspected, even if it is deemed that inspection is no longer necessary on that equipment, whether it passes or fails, will be included in the billing</strong>
        </q-item-label>
        <q-item-label class="col text-justify q-pb-xs">
          <strong>4.</strong>
          <strong>Grace Period:</strong> If equipment fails an inspection, there will be a
          <strong>30-days grace period</strong>- within this period only mobilization will be billed for the reinspection. Beyond that period, it will be billed as new equipment.
        </q-item-label>
        <q-item-label class="col text-justify q-pb-xs">
          <strong>5.</strong>
          <strong>Equipment Breakdown.</strong>
          PEOPLE360 is not responsible for any loss, destruction, or damage that may occur during the conduct of inspection of the units of equipment, nor any parts of said number of equipment, covered by this agreement.
        </q-item-label>
        <q-item-label class="col text-justify q-pb-xs">
          <strong>6.</strong>
          If DOLE Witness is required,
          <strong>({{this.userDetails.companyName}})</strong> will make the necessary arrangements.
        </q-item-label>
        <q-item-label class="col text-justify q-pb-md">
          <strong>7.</strong>
          This qoutation is only valid for 6 months after the date of issuance.
        </q-item-label>
      </q-item-label>
      <q-item-label class="col-6 text-justify q-pb-lg">Yours Very Truly,</q-item-label>
      <div class="row col-6">
        <q-item-label class="col-12 text-justify">Conforme:</q-item-label>
        <q-item-label class="col-12 text-justify">
          For
          <strong>{{this.userDetails.companyName}}</strong>
        </q-item-label>
      </div>
      <div class="row col-6">
        <q-item-label
          class="col-12 text-justify"
          v-for="safety in safetyAssociates "
          :key="safety.id"
        >
          <strong>{{safety.name}}</strong>
        </q-item-label>
        <q-item-label class="col-12 text-justify">Safety Associate</q-item-label>
      </div>
      <div class="row col-6 q-mt-lg">
        <q-item-label
          class="col text-justify q-pb-lg"
        >({{this.userDetails.name}} {{this.userDetails.middleName.charAt(0)}}. {{this.userDetails.lastName}}, {{this.todaysDate}})</q-item-label>
      </div>
    </q-card-actions>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["proposaltoPass"],
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"])
  },
  mounted() {
    console.log(this.proposaltoPass);
  }
};
</script>

<style>
</style>