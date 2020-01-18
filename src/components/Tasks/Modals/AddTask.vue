<template>
  <q-card class="full-width">
    <modal-header>Add Task</modal-header>
    <q-form @submit.prevent="submitForm()" class="addtask">
      <q-card-section class="tasks">
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
<style lang="scss" scoped>
</style>