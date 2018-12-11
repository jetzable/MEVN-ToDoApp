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
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Insert a Task"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    placeholder="Insert Description"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <button class="btn btn-primary btn-block">Agregar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      task: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    addTask() {
      console.log(this.task);
    }
  }
};
</script>
