<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Proposal</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form>
      <q-card-section>
        <!-- <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Add Equipment Type"
          v-model="proposals.date"
        >
          <template v-slot:append>
            <q-icon name="close" class="cursor-pointer" />
          </template>
        </q-input>-->
        <q-input
          v-model="proposals.date"
          lazy-rules
          class="col q-mb-none q-pb-sm"
          label="Start Date"
        >
          <template v-slot:append>
            <q-icon v-if="proposals.date" name="close" class="cursor-pointer" />
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  @input="() => $refs.qDateProxy.hide()"
                  v-model="proposals.date"
                  mask="YYYY-MM-DD"
                  landscape
                  :options="optionsFn"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  props: ["proposals", "id"],
  firestore() {
    return {
      preproposals: fs.collection("preproposals")
    };
  },
  methods: {
    optionsFn(preproposal) {
      var today = new Date();
      var year = new Date();
      var addDay = today.setDate(today.getDate() + 1);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "/" + mm + "/" + dd;
      // console.log(today);

      return preproposal > today && preproposal <= "3000/03/15";
    }
  },
  mounted() {
    console.log(this.proposals, this.id);
  }
};
</script>

<style>
</style>