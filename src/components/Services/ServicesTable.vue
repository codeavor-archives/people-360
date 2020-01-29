<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Dummy</th>
              <th class="text-left">Dummy</th>
              <th class="text-left">Dummy</th>
              <th class="text-left">Dummy</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Dummy</td>
              <td class="text-left">Dummy</td>
              <td class="text-left">Dummy</td>
              <td class="text-left">Dummy</td>
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
      <edit-services @close="showEditServices = false" :service="service" :id="key"></edit-services>
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