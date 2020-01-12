<template>
  <q-card>
    <modal-header>Edit Task</modal-header>
    <q-form @submit.prevent="submitForm()">
      <q-card-section>
        <modal-taskname ref="taskname" :name.sync="taskToSubmit.name"></modal-taskname>
        <modal-duedate @clear="clearDueDate" :duedate.sync="taskToSubmit.dueDate"></modal-duedate>
        <modal-duetime v-if="taskToSubmit.dueDate" :duetime.sync="taskToSubmit.dueTime"></modal-duetime>
      </q-card-section>
      <q-card-actions align="right">
        <modal-button></modal-button>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit.task";
export default {
  mixins: [mixinAddEditTask],
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  methods: {
    ...mapActions("storetasks", ["updateTasks"]),
    submitTask() {
      // console.log("submit Task");
      // this.addTask(this.taskToSubmit);
      this.updateTasks({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },

  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>
