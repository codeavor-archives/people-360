<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Add Checklist</div>
      <q-space></q-space>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>
    <q-form @submit.prevent="addChecklist">
      <q-card-section>
        <div class="row">
          <div class="col-6" v-for="(name, index) in checklistarr" :key="index">
            <q-input
              :rules="[val => !!val || 'Field is required']"
              ref="name"
              class="q-pa-xs"
              label="Checklist"
              v-model="name.name"
            >
              <template v-slot:append>
                <q-icon v-if="name.name" name="close" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
        </div>
        <q-btn class="q-mt-md" @click="addCheck" round icon="add"></q-btn>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn type="submit" icon="add" label="Add Checklist" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      checklists: fs.collection("checklists"),
      services: fs.collection("services")
    };
  },
  props: ["checklist"],
  data() {
    return {
      checklistData: {
        check: {}
      },
      checklistarr: [
        {
          name: "",
          status: false
        }
      ]
    };
  },
  computed: {
    toObject() {
      return Object.assign({}, ...this.checklistarr);
    }
  },
  methods: {
    addCheck() {
      this.checklistarr.push({
        name: "",
        status: false
      });
    },
    addChecklist() {
      this.checklistData.equipment = this.checklist.equipment;
      this.checklistData.id = this.checklist.id;
      this.checklistData.check = this.checklistarr;

      this.$firestore.services
        .doc(this.checklist.id)
        .update(this.checklistData)
        .then(response => {
          console.log(response);
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
