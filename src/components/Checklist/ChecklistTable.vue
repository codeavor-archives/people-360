<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Checklist Table"
          color="primary"
          :data="services"
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
              <q-td :props="props" key="equipment">{{props.row.equipment}}</q-td>
              <q-td>
                <q-btn
                  @click="showChecklistModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="remove_red_eye"
                >
                  <q-tooltip content-class="bg-deep-orange">View</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <q-dialog
        v-model="showChecklist"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <checklist-modal @close="showChecklist=false" :checklistTable="checklistTable"></checklist-modal>
      </q-dialog>
    </div>
  </q-page>
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
  data() {
    return {
      checklistTable: {},
      showChecklist: false,
      maximizedToggle: true,
      filter: "",
      columns: [
        {
          name: "equipment",
          align: "left",
          label: "Equipment",
          sortable: true,
          field: "equipment"
        },

        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showChecklistModal(props) {
      this.showChecklist = true;
      this.checklistTable = props;
      // console.log(props);
    }
  },
  components: {
    "checklist-modal": require("components/Checklist/Checklist").default
  }
};
</script>

<style>
</style>