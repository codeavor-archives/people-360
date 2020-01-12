<template>
  <q-item
    v-touch-hold:500.mouse="showEditTaskModal"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
    @click="updateTasks({ id: id, updates: { completed: !task.completed }})"
  >
    <q-item-section side>
      <q-checkbox v-model="task.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        v-html="$options.filters.searchHighlight(task.name, search)"
        :class="{ 'text-strikethrough' : task.completed }"
      ></q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon size="18px" name="event" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ taskdueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTaskModal" dense flat round color="grey" icon="edit" />
        <q-btn @click.stop="promptToDelete(id)" dense flat round color="red" icon="delete" />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :id="id" @close="showEditTask=false"></edit-task>
    </q-dialog>
  </q-item>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";
import { match } from "minimatch";
export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  methods: {
    ...mapActions("storetasks", ["updateTasks", "deleteTasks"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "This wont be reverted",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTasks(id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM-DD-YYYY");
    },
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return value.replace(searchRegExp, match => {
          return '<span class="bg-yellow-6">' + match + "</span>";
        });
      }
      return value;
    }
  },
  components: {
    "edit-task": require("./Modals/EditTask").default
  },
  computed: {
    ...mapState("storetasks", ["search"]),
    ...mapGetters("storesettings", ["settings"]),
    taskdueTime() {
      if (this.settings.show12HourFormat) {
        return date.formatDate(
          this.task.dueDate + " " + this.task.dueTime,
          "hh:mmA"
        );
      }
      return this.task.dueTime;
    }
  }
};
</script>

<style lang="scss" scoped>
.text-strikethrough {
  text-decoration: line-through;
}
</style>