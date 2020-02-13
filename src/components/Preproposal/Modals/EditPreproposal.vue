<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Proposal</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form>
      <q-card-section>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Add Equipment Type"
          v-model="proposals.name"
        >
          <template v-slot:append>
            <q-icon name="close" class="cursor-pointer" />
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
  mounted() {
    console.log(this.proposals, this.id);
  }
};
</script>

<style>
</style>