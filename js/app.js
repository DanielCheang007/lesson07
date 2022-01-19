import Todo from "./todo.js";
const { createApp } = Vue;

const firstTodo = new Todo("finish homework");
const secondTodo = new Todo("take a walk");

const config = {
  data: function () {
    return {
      appTitle: "Daniels' todo list",
      todoList: [firstTodo, secondTodo],
      formData: {
        name: null,
        color: null
      },
      editing: null, // the editing todo
      ready: false
    };
  },
  mounted() {
    this.ready = true;
  },
  computed: {
    finishedTodoLength() {
      return this.todoList.filter((t) => t.done).length;
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        name: null,
        color: null,
        date: null
      };
    },
    onSubmit: function (event) {
      // event.preventDefault(); // prevent submit event

      const { name, color, date } = this.formData;

      if (this.editing) {
        // update
        Object.assign(this.editing, { name, color, date });

        this.editing = null;
      } else {
        const todo = new Todo(name, color, date);
        this.todoList.push(todo);
      }

      this.resetForm();
    },
    editTodo(todo) {
      this.editing = todo;

      const { name, color, date } = todo;
      Object.assign(this.formData, { name, color, date });
      // this.formData.name = name;
      // this.formData.color = color;
    },
    cancelEditing() {
      this.editing = null;
      this.resetForm();
    },
    delTodo(todo) {
      const idx = this.todoList.indexOf(todo);
      if (idx > -1) {
        this.todoList.splice(idx, 1);
      }
    }
  }
};

const app = createApp(config);

console.log(app);

app.mount("#app");
