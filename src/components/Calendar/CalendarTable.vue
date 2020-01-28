<template>
  <q-page>
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <!-- <th class="text-left">ID</th> -->
              <th class="text-left">Title</th>
              <th class="text-left">Start</th>
              <th class="text-left">End</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in inspectionEvent" :key="event.id">
              <!-- <td class="text-left">{{ user.id }}</td> -->
              <td class="text-left">{{ event.title }}</td>
              <td class="text-left">{{ event.start }}</td>
              <td class="text-left">{{ event.end }}</td>
              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                  @click="showEditEventModal(event)"
                  flat
                  dense
                  icon="edit"
                ></q-btn>
                <!-- <q-btn round @click="deleteUser()" color="red" flat dense icon="delete"></q-btn> -->
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <!-- <div class>
        <q-pagination class="q-pt-lg" v-model="current" :max="5" :direction-links="true"></q-pagination>
      </div>-->
    </div>
    <q-dialog v-model="showEditEvent">
      <edit-event :event="event" :id="id" @close="showEditEvent=false"></edit-event>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      inspectionEvent: fs.collection("inspectionEvent")
    };
  },
  data() {
    return {
      showEditEvent: false,
      current: "",
      id: "",
      event: {
        title: "",
        details: "",
        start: "",
        end: "",
        color: "",
        id: ""
      }
    };
  },
  methods: {
    showEditEventModal(event) {
      this.showEditEvent = true;
      this.event = event;
      this.id = event.id;
      // console.log(event.id);
      // console.log(this.id);
    }
  },
  components: {
    "edit-event": require("components/Calendar/Modals/EditEvent").default
  }
};
</script>