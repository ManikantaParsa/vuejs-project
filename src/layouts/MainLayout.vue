<template>
  <div class="page padding">
    <q-form @submit.prevent="saveTask" ref="taskForm">
      <q-input v-model="title" label="Title" :rules="[val => !!val || 'Title is required']" />
      <q-select v-model="designation" :options="designationOptions" label="Designation" :rules="[val => !!val || 'Designation is required']" />
      <q-select v-model="status" :options="statusOptions" label="Status" :rules="[val => !!val || 'Status is required']" />
      <q-btn type="submit" :label="editingTask ? 'Update' : 'Save'" color="primary" />
    </q-form>

    <q-table :rows="tasks" :columns="columns" row-key="sno">
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <template v-if="props.col.name === 'sno'">
          {{ props.pageIndex + 1 }}
        </template>
        <template v-else-if="props.col.name === 'title'">
          {{ props.row.title_name }}
        </template>
        <template v-else-if="props.col.name === 'designation'">
          {{ props.row.designation }}
        </template>
        <template v-else-if="props.col.name === 'status'">
          {{ props.row.status }}
        </template>
        <template v-else-if="props.col.name === 'actions'">
          <q-btn size="sm" color="primary" @click="editTask(props.row)">Edit</q-btn>
          <q-btn size="sm" color="negative" @click="deleteTask(props.row.sno)">Delete</q-btn>
        </template>
      </q-td>
    </template>
  </q-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sno: null,
      title: '',
      designation: '',
      status: '',
      tasks: [],
      designationOptions: ['Manager', 'Developer', 'Designer', 'Tester'],
      statusOptions: ['All','To Do', 'In Progress', 'Done'],
      columns: [
        { name: 'sno', label: 'SNo', field: 'sno' },
        { name: 'title', label: 'Title', field: 'title_name' },
        { name: 'designation', label: 'Designation', field: 'designation' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'actions', label: 'Actions', field: 'actions', sortable: false }
      ],
      editingTask: null
    };
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    isFormValid() {
      return this.title && this.designation && this.status;
    }
  },
  methods: {
    async saveTask() {
  if (this.title == "" && this.designation  == "" && this.status == "" ) {
    this.$q.notify({
      color: 'negative',
      message: 'Please fill in all fields',
      position: 'top',
      timeout: 2000 
    });
    return;
  }
  const formValid = await this.$refs.taskForm.validate();
  if (!formValid) {
    return;
  }
  const taskData = {
    sno: this.sno,
    title: this.title,
    designation: this.designation,
    status: this.status
  };

  try {
    if (this.editingTask) {
      await axios.put(`http://localhost:5000/seedMovement/${this.editingTask.sno}`, taskData);
      this.editingTask = null;
    } else {
      await axios.post('http://localhost:5000/seedMovement/save', taskData);
    }
    this.fetchTasks();
    this.resetForm();
  } catch (error) {
    console.error('Error saving task:', error);
  }
    },
    resetForm() {
      this.sno = null;
      this.title = [];
      this.designation = [];
      this.status = [];
    },
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/seedMovement/getdata');
        this.tasks = response.data.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    editTask(task) {
      this.editingTask = task;
      this.sno = task.sno;
      this.title = task.title_name;
      this.designation = task.designation;
      this.status = task.status;
    },
    async deleteTask(sno) {
      try {
        await axios.delete(`http://localhost:5000/seedMovement/delete/${sno}`);
        this.fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
      
    }
   
  }
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>
