<template>
  <!-- <q-table :filter="filter" title="Users" :data="data" :columns="columns" row-key="id">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
  </q-table>-->
  <q-page>
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">Roles</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="text-left">{{user.name}}</td>
              <td class="text-left">{{user.email}}</td>
              <td class="text-left">{{user.roles}}</td>
              <td class="text-left">
                <q-btn round color="primary" flat dense icon="edit"></q-btn>
                <q-btn round color="red" flat dense icon="delete"></q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class>
        <q-pagination class="q-pt-lg" v-model="current" :max="5" :direction-links="true"></q-pagination>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      current: 3,
      users: {},
      filter: "",
      columns: [
        // {
        //   field: row => row.id,
        //   format: val => `${val}`,
        //   name: "id",
        //   label: "Name",
        //   align: "left",
        //   field: "id",
        //   sortable: true
        // },

        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "online",
          label: "Name",
          align: "left",
          field: "online",
          sortable: true
        },
        {
          name: "roles",
          align: "left",
          label: "Roles",
          field: "roles",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    fbReadUsers() {
      // let userID = fb.auth().currentUser.uid;
      let userstable = db.ref("users/");
      userstable.once(
        "value",
        snapshot => {
          //   console.log(snapshot.val());
          let data = snapshot.val();
          // let arraydata = Object.values(data);
          // this.data = arraydata;
          this.users = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.fbReadUsers();
  }
};
</script>

<style>
</style>