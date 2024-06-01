import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      tasks: [],
      editingTask: null
    };
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setEditingTask(state, task) {
      state.editingTask = task;
    },
    resetEditingTask(state) {
      state.editingTask = null;
    }
  },
  actions: {
    async fetchTasks(context) {
      try {
        const response = await axios.get('http://localhost:5000/seedMovement/get');
        context.commit('setTasks', response.data.tableData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    // Add more actions for saving, editing, and deleting tasks as needed
  }
});

export default store;
