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
                  @click="showEditServiceModal(props.row)"
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
  }
};
</script>

<style>
</style>