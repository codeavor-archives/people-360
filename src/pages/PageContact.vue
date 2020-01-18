<template>
  <q-page padding>
    <template v-if="usersDownloaded">
      <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
      >
        <q-list separator class="full-width">
          <q-item
            :to="'/chat/'+ key"
            v-for="(user, key) in users"
            :key="key"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">{{ user.name.charAt(0).toUpperCase() }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
              <q-item-label caption lines="1">{{ user.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-badge
                :color="user.online ? 'green-7' : 'grey-4'"
              >{{ user.online ? 'Online': 'Offline' }}</q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </transition>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
      </span>
    </template>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["users"]),
    ...mapState("auth", ["usersDownloaded"])
  }
};
</script>

<style>
</style>