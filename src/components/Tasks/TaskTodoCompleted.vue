<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div :class="{ 'q-mt-lg' : !settings.showTaskInOneList }">
      <list-header v-if="!settings.showTaskInOneList" bgcolor="bg-green-4">
        Task
        Todo
        Completed
      </list-header>
      <q-list bordered separator>
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["tasksCompleted"],
  components: {
    task: require("./Task").default,
    "list-header": require("../SharedBanner/ListHeader").default
  },
  computed: {
    ...mapGetters("storesettings", ["settings"])
  }
};
</script>

<style>
</style>