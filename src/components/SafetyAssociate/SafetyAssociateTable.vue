<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Safety Associate Table"
          color="primary"
          :data="safetyAssociates"
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
              <q-td :props="props" key="name">{{props.row.name}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditAssociateModal(props.row)"
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
    <q-dialog v-model="showEditAssociate">
      <edit-associate
        @close="showEditAssociate = false"
        :safetyAssociate="safetyAssociate"
        :id="id"
      ></edit-associate>
    </q-dialog>
  </q-page>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      safetyAssociates: fs.collection("safetyAssociates")
    };
  },
  data() {
    return {
      filter: "",
      id: "",
      showEditAssociate: false,
      safetyAssociate: {},
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          sortable: true,
          field: "name"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  components: {
    "edit-associate": require("components/SafetyAssociate/Modals/EditSafetyAssociate")
      .default
  },
  methods: {
    showEditAssociateModal(props) {
      this.showEditAssociate = true;
      this.safetyAssociate = props;
    }
  }
};
</script>

<style>
</style>