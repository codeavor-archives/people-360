<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <div>
      <q-img :src="service.photo" class="imageProduct" />
      <q-card-section>
        <div class="text-caption text-orange-9">{{service.type}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{service.equipment}}</div>
        <div
          class="text-caption text-grey"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      </q-card-section>
      <q-card-actions>
        <q-badge
          v-if="userDetails.roles=='new'"
          class="q-ml-sm"
        >{{service.newClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-badge>
        <q-badge
          v-if="userDetails.roles=='old'"
          class="q-ml-sm"
        >{{service.oldClientPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-badge>
        <q-space />
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">{{ lorem }}</q-card-section>
        </div>
      </q-slide-transition>
    </div>
  </q-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { fb, db, fs } from "boot/firebase";
export default {
  props: ["service", "id"],
  firestore() {
    return {
      services: fs.collection("services")
    };
  },
  data() {
    return {
      expanded: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>
<style lang="scss" scoped>
.my-card {
  max-width: 350px;
}
.imageProduct {
  max-height: 500px;
}
</style>