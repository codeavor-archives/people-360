export default {
  methods: {
    submitForm() {
      this.$refs.taskname.$refs.name.validate();
      if (!this.$refs.taskname.$refs.name.hasError) {
        this.submitTask();
      }
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    }
  },
  components: {
    "modal-header": require("components/Tasks/Modals/Shared/Modal-Header")
      .default,
    "modal-taskname": require("components/Tasks/Modals/Shared/Modal-TaskName")
      .default,
    "modal-duedate": require("components/Tasks/Modals/Shared/Modal-DueDate")
      .default,
    "modal-duetime": require("components/Tasks/Modals/Shared/Modal-DueTime")
      .default,
    "modal-button": require("components/Tasks/Modals/Shared/Modal-Button")
      .default
  }
};
