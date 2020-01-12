<template>
  <q-page padding>
    <q-list separator class="full-width">
      <q-item to="/chat" v-for="(user, key) in users" :key="key" class="q-my-sm" clickable v-ripple>
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
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["users"])
  }
};
</script>

<style>
</style>