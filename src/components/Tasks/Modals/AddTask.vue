<template>
  <q-card>
    <modal-header>Add Task</modal-header>
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
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("storetasks", ["addTask"]),

    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>
