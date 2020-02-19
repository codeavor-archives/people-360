<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Users Table"
          color="primary"
          :data="data"
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
              <q-td
                :props="props"
                key="name"
              >{{props.row.name}} {{props.row.middleName}} {{props.row.lastName}}</q-td>
              <q-td :props="props" key="email">{{props.row.email}}</q-td>
              <q-td :props="props" key="ip">{{props.row.ip}}</q-td>
              <q-td :props="props" key="roles">{{props.row.roles}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditUserModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="edit"
                >
                  <q-tooltip content-class="bg-deep-orange">Edit</q-tooltip>
                </q-btn>
                <q-btn
                  round
                  color="primary"
                  @click="showAddInspectorModal(props.row)"
                  flat
                  dense
                  icon="add"
                >
                  <q-tooltip content-class="bg-deep-orange">Add as Inspector</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="showEditUser">
      <editusers @close="showEditUser=false" :user="user" :id="key"></editusers>
    </q-dialog>
    <q-dialog v-model="showAddInspector">
      <add-inspector @close="showAddInspector=false" :user="user" :id="key"></add-inspector>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db } from "boot/firebase";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showEditUser: false,
      showAddInspector: false,
      current: 3,
      user: "",
      key: "",
      data: [],
      userToSubmit: {},
      filter: "",
      columns: [
        {
          name: "name",
          align: "left",
          label: "Full Name",
          sortable: true,
          field: "name"
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          sortable: true,
          field: "email"
        },
        {
          name: "ip",
          align: "left",
          label: "Login IP",
          sortable: true,
          field: "ip"
        },
        {
          name: "roles",
          align: "left",
          label: "Roles",
          sortable: true,
          field: "roles"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditUserModal(props) {
      // console.log(props.createdBy);
      this.showEditUser = true;
      this.user = props;
      this.key = props.createdBy;
      // console.log(key);
    },
    showAddInspectorModal(props) {
      this.showAddInspector = true;
      this.user = props;
      this.key = props.createdBy;
      // console.log(key);
    }
  },
  computed: {
    ...mapGetters("auth", ["users"]),
    ...mapState("auth", ["usersDownloaded"])
  },
  components: {
    editusers: require("components/Users/Modals/EditUsers").default,
    "add-inspector": require("components/Users/Modals/AddInspector").default
  },
  mounted() {
    this.allusers = this.users;
    const usersArray = Object.values(this.users);
    this.data = usersArray;

    // console.log(usersArray);
    // console.log(this.users);
  }
};
</script>

<style></style>
