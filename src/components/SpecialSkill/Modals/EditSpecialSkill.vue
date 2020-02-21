<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="fbEditSkill">
      <q-card-section class="row">
        <div class="text-h6">Edit Skill</div>
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
          label="Skill Name"
          v-model="skill.skillName"
        >
          <template v-slot:append>
            <q-icon v-if="skill.skillName" name="close" class="cursor-pointer"></q-icon>
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
  props: ["skill"],
  firestore() {
    return {
      specialSkills: fs.collection("specialSkills")
    };
  },
  methods: {
    fbEditSkill() {
      this.$q.loading.show();
      this.$firestore.specialSkills
        .doc(this.skill.id)
        .update(this.skill)
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

<style>
</style>