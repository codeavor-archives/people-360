<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="taskDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>
        <p
          v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
        >No search results.</p>

        <q-scroll-area class="q-scroll-area-tasks col">
          <no-task v-if="!Object.keys(tasksTodo).length && !search && !settings.showTaskInOneList"></no-task>
          <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo"></tasks-todo>
          <tasks-todo-completed
            v-if="Object.keys(tasksCompleted).length"
            :tasksCompleted="tasksCompleted"
            class="q-mb-lg"
          ></tasks-todo-completed>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask=true"
            round
            class="all-pointer-events"
            size="24px"
            icon="add"
            color="primary"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>
    <q-dialog v-model="showAddTask">
      <addTask @close="showAddTask=false"></addTask>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "PageTodo",
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    // tasks() {
    // return this.$store.getters["storetasks/tasks"]; //first params is the module and tasks in an array === Task Store module and Task in getters
    // Anothe way is to import the mapGetters from vuex
    ...mapGetters("storetasks", ["tasksTodo", "tasksCompleted"]),
    ...mapGetters("storesettings", ["settings"]),
    ...mapState("storetasks", ["search", "taskDownloaded"])
    // }
  },
  components: {
    addTask: require("../components/Tasks/Modals/AddTask").default,
    "tasks-todo": require("../components/Tasks/TaskTodo").default,
    "tasks-todo-completed": require("../components/Tasks/TaskTodoCompleted")
      .default,
    "no-task": require("../components/Tasks/NoTask").default,
    search: require("../components/Tasks/Tools/SearchBar").default,
    sort: require("../components/Tasks/Tools/Sort").default
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  }
};
</script>

<style lang="css" scoped>
/* .q-scroll-area-tasks {
  /* display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;*/
/* display: flex; 
  flex-grow: 1;  
} */
</style>
