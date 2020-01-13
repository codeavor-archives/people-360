import Vue from "vue";
import { uid, Notify } from "quasar";
import { fb, db } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

// import { db } from "../boot/firebase";
const state = {
  tasks: {},
  search: "",
  sort: "name",
  taskDownloaded: false
};

const mutations = {
  updateTasks(state, payload) {
    // console.log("payload from mutations", payload);
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTasks(state, id) {
    // console.log("delete id:", id);
    // delete state.tasks[id]
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  clearTask(state) {
    state.tasks = {};
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
  setTaskDownloaded(state, value) {
    state.taskDownloaded = value;
  }
};

const actions = {
  updateTasks({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTasks({ dispatch }, id) {
    dispatch("fbDeleteTasks", id);
  },
  addTask({ dispatch }, task) {
    let taskID = uid();
    let payload = {
      id: taskID,
      task: task
    };
    dispatch("fbAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbReadData({ commit }) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userTasks = db.ref("tasks/" + userID);

    // Intial Check for data
    userTasks.once(
      "value",
      snapshot => {
        commit("setTaskDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );

    // child_added hook
    userTasks.on("child_added", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        task: task
      };
      commit("addTask", payload);
    });
    // child_changed hook
    userTasks.on("child_changed", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTasks", payload);
    });
    // child_removed
    userTasks.on("child_removed", snapshot => {
      let taskID = snapshot.key;
      commit("deleteTasks", taskID);
    });
  },
  fbAddTask({}, payload) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userTasks = db.ref("tasks/" + userID + "/" + payload.id);
    userTasks.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create({
          message: "Task Added",
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }]
        });
      }
    });
  },
  fbUpdateTask({}, payload) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userTasks = db.ref("tasks/" + userID + "/" + payload.id);

    userTasks.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        let keys = Object.keys(payload.updates);
        if (!(keys.includes("completed") && keys.length == 1)) {
          Notify.create({
            message: "Task Updated",
            position: "bottom",
            timeout: 1000,
            textColor: "white",
            actions: [{ icon: "close", color: "white" }]
          });
        }
      }
    });
  },
  fbDeleteTasks({}, id) {
    let userID = fb.auth().currentUser.uid;
    // userID = "BkapziHxRBPVBjMOUYoAMdNmF622";
    let userTasks = db.ref("tasks/" + userID + "/" + id);

    userTasks.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create({
          message: "Task Deleted",
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }]
        });
      }
    });
  }
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        tasksBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > tasksBProp) return 1;
      else if (taskAProp < tasksBProp) return -1;
      else return 0;
    });
    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
      tasksFiltered = {};
    if (state.search) {
      // populate empty object
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
