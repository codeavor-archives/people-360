<template>
  <q-page>
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <!-- <th class="text-left">ID</th> -->
              <th class="text-left">Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">Roles</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, key) in users" :key="key" :id="key">
              <!-- <td class="text-left">{{ user.id }}</td> -->
              <td class="text-left">{{ user.name }}</td>
              <td class="text-left">{{ user.email }}</td>
              <td class="text-left">{{ user.roles }}</td>
              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                  @click="showEditUserModal(user, key)"
                  flat
                  dense
                  icon="edit"
                ></q-btn>
                <q-btn
                  round
                  color="primary"
                  @click="showAddInspectorModal(user, key)"
                  flat
                  dense
                  icon="add"
                ></q-btn>
                <!-- <q-btn round @click="deleteUser()" color="red" flat dense icon="delete"></q-btn> -->
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class>
        <q-pagination class="q-pt-lg" v-model="current" :max="5" :direction-links="true"></q-pagination>
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
      // users: {},
      user: {},
      key: {},
      userToSubmit: {},
      filter: ""
    };
  },
  methods: {
    showEditUserModal(user, key) {
      this.showEditUser = true;
      this.user = user;
      this.key = key;
      console.log(key);
    },
    showAddInspectorModal(user, key) {
      this.showAddInspector = true;
      this.user = user;
      this.key = key;
      console.log(key);
    }
  },
  computed: {
    ...mapGetters("auth", ["users"]),
    ...mapState("auth", ["usersDownloaded"])
  },
  components: {
    editusers: require("components/Users/Modals/EditUsers").default,
    "add-inspector": require("components/Users/Modals/AddInspector").default
  }
};
</script>

<style></style>
