<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Edit Safety Associate</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="editSafetyAssociate">
      <q-card-section>
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Safety Associate Name"
          v-model="safetyAssociate.name"
        >
          <template v-slot:append>
            <q-icon v-if="safetyAssociate.name" name="close" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="save" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { db, fb, fc, fs } from "boot/firebase";
export default {
  props: ["safetyAssociate", "id"],
  firestore() {
    return {
      safetyAssociates: fs.collection("safetyAssociates")
    };
  },
  methods: {
    editSafetyAssociate() {
      //   console.log(this.safetyAssociate.id);
      this.$q.loading.show();
      this.$firestore.safetyAssociates
        .doc(this.safetyAssociate.id)
        .update(this.safetyAssociate)
        .then(response => {
          this.$q.loading.hide();
        })
        .catch(error => {
          console.log(error);
          this.$q.loading.hide();
        });
      this.$emit("close");
    }
  }
};
</script>