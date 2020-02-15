<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Inspector Position Table"
          color="primary"
          :data="positions"
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
              <q-td :props="props" key="positionName">{{props.row.positionName}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditPositionModal(props.row)"
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
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
    </div>
    <q-dialog v-model="showEditPosition">
      <edit-positon @close="showEditPosition = false" :position="position" :id="id"></edit-positon>
    </q-dialog>
  </q-page>
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
      showEditPosition: false,
      id: "",
      position: {
        positionName: ""
      },
      filter: "",
      columns: [
        {
          name: "positionName",
          align: "left",
          label: "Position Name",
          sortable: true,
          field: "positionName"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditPositionModal(props) {
      this.showEditPosition = true;
      this.position = props;
      this.id = props.id;
      // console.log(this.id);
    }
  },
  components: {
    "edit-positon": require("components/Inspector/Modal/EditPosition").default
  }
};
</script>

<style></style>
