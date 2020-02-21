<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Special Skills Table"
          color="primary"
          :data="specialSkills"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td :props="props" key="skillName">{{props.row.skillName}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditSkillModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="edit"
                >
                  <q-tooltip content-class="bg-deep-orange">Edit</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="showEditSkill">
      <edit-skill :skill="skill" @close="showEditSkill = false"></edit-skill>
    </q-dialog>
  </q-page>
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
      skill: {},
      showEditSkill: false,
      filter: "",
      columns: [
        {
          name: "skillName",
          align: "left",
          label: "Skill Name",
          sortable: true,
          field: "skillName"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditSkillModal(props) {
      this.showEditSkill = true;
      this.skill = props;
    }
  },
  components: {
    "edit-skill": require("components/SpecialSkill/Modals/EditSpecialSkill")
      .default
  }
};
</script>

<style>
</style>