<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Equipment Category Table"
          color="primary"
          :data="equipmentCategories"
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
              <q-td :props="props" key="type">{{props.row.type}}</q-td>
              <q-td :props="props" key="position">{{props.row.position}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditTypeModal(props.row)"
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
    <q-dialog v-model="showEditType">
      <edit-category @close="showEditType = false" :equipmentCategory="equipmentCategory" :id="id"></edit-category>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      equipmentCategories: fs.collection("equipmentCategories")
    };
  },
  data() {
    return {
      filter: "",
      id: "",
      showEditType: false,
      columns: [
        {
          name: "type",
          align: "left",
          label: "Type",
          sortable: true,
          field: "type"
        },
        {
          name: "position",
          align: "left",
          label: "Position",
          sortable: true,
          field: "position"
        },
        {
          align: "left",
          label: "Action"
        }
      ],
      equipmentCategory: {
        id: "",
        type: "",
        subCategory: ""
      }
    };
  },
  methods: {
    showEditTypeModal(props) {
      this.showEditType = true;
      this.equipmentCategory = props;
      this.id = props.id;
      // console.log(category.id);
    }
  },
  components: {
    "edit-category": require("components/Services/Modal/EditEquipmentType")
      .default
  }
};
</script>

<style>
</style>