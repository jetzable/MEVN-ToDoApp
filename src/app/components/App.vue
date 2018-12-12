<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a
        href="/"
        class="navbar-brand"
      >MEVN ToDo App</a>
    </nav>

    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert a Task"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    placeholder="Insert Description"
                    v-model="task.description"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <template v-if="editing === false">
                  <button class="btn btn-primary btn-block">ADD</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in tasks"
                :key="task.id"
              >
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <button
                  @click.prevent="deleteTask(task._id)"
                  class="btn btn-danger"
                >Delete</button>
                <button
                  @click.prevent="updateTask(task._id)"
                  class="btn btn-secondary"
                >Edit</button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      editing: false,
      taskToEdit: ""
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    addTask() {
      if (this.editing === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => this.getTasks());
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.editing = false;
          });
      }
      this.task = new Task();
    },
    deleteTask(ID) {
      fetch("/api/tasks/" + ID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    },
    updateTask(ID) {
      fetch("/api/tasks/" + ID)
        .then(res => res.json())
        .then(data => {
          this.editing = true;
          this.taskToEdit = data._id;
          this.task = new Task(data.title, data.description);
        });
    }
  }
};
</script>
