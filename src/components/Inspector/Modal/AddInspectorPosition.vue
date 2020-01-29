<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="fbAddPosition">
      <q-card-section class="row">
        <div class="text-h6">Add Position</div>
        <q-space></q-space>
        <div>
          <q-btn v-close-popup flat round dense icon="close"></q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          class="col"
          label="Position"
          v-model="position.positionName"
        >
          <template v-slot:append>
            <q-icon
              v-if="position.positionName"
              name="close"
              class="cursor-pointer"
            ></q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn icon="save" color="primary" type="submit" label="Save"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      positions: fs.collection("positions")
    };
  },
  data() {
    return {
      position: {
        positionName: ""
      }
    };
  },
  methods: {
    fbAddPosition() {
      this.$q.loading.show();
      this.$firestore.positions
        .add(this.position)
        .then(error => {
          if (error) {
            console.log(error);
            this.$q.loading.hide();
          } else {
            console.log(this.event);
            this.$q.loading.hide();
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.$emit("close");
    }
  }
};
</script>
