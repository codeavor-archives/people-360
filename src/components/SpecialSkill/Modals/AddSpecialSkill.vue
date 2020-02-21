<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="fbAddSkill">
      <q-card-section class="row">
        <div class="text-h6">Add Skill</div>
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
          label="Skills Name"
          v-model="skill.skillName"
        >
          <template v-slot:append>
            <q-icon v-if="skill.skillName" name="close" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn icon="add" color="primary" type="submit" label="Save"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      specialSkills: fs.collection("specialSkills")
    };
  },
  data() {
    return {
      skill: {
        skillName: "",
        label: "",
        value: ""
      }
    };
  },
  methods: {
    fbAddSkill() {
      this.$q.loading.show();
      this.skill.label = this.skill.skillName;
      this.skill.value = this.skill.skillName;
      this.$firestore.specialSkills
        .add(this.skill)
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

<style>
</style>