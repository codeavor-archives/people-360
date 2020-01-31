<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="7">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Services Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Equipment</th>
              <th class="text-left">Person Count</th>
              <th class="text-left">Days Count</th>
              <th class="text-left">Photo</th>
              <th class="text-left">Status</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id">
              <td class="text-left">{{service.name}}</td>
              <td class="text-left">{{service.equipment}}</td>
              <td class="text-left">{{service.personCount}}</td>
              <td class="text-left">{{service.dayCount}}</td>
              <td class="text-left">
                <q-img avatar :src="service.photo" />
              </td>
              <td class="text-left">{{service.available}}</td>
              <td class="text-left">
                <q-btn
                  @click="showEditServiceModal(service, key)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="edit"
                ></q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
    </div>
    <q-dialog v-model="showEditServices">
      <edit-services @close="showEditServices = false" :service="service" :id="id"></edit-services>
    </q-dialog>
  </q-page>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      services: fs.collection("services")
    };
  },
  data() {
    return {
      showEditServices: false,
      key: {},
      id: "",
      service: {
        id: "",
        name: "",
        equipment: "",
        personCount: "",
        dayCount: "",
        available: "true"
      }
    };
  },
  methods: {
    showEditServiceModal(service) {
      this.showEditServices = true;
      this.service = service;
      this.id = service.id;
      console.log(service.id);
    }
  },
  components: {
    "edit-services": require("components/Services/Modal/EditServices").default
  }
};
</script>