<template>
  <div id="todo-app">
    <h1>Todo List With Class</h1>
    <form v-on:submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a task" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button v-on:click="removeTodo(index)">X</button>
        <button v-on:click="editTodo(todo)">Edit</button>
      </li>
    </ul>
    <div v-if="editMode">
      <form v-on:submit.prevent="updateTodo">
        <input v-model="editTodoText" />
        <button type="submit">Save</button>
        <button v-on:click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrudClassTodo",
  data() {
    return {
      todos: [
        {
          id: 1,
          text: "Learn Vue.js",
          completed: false
        },
        {
          id: 2,
          text: "Build a Todo App",
          completed: false
        },
        {
          id: 3,
          text: "Deploy to production",
          completed: false
        }
      ],
      newTodo: "",
      editTodoId: null,
      editTodoText: ""
    };
  },
  computed: {
    nextTodoId() {
      const lastTodo = this.todos[this.todos.length - 1];
      return lastTodo ? lastTodo.id + 1 : 1;
    },
    editMode() {
      return this.editTodoId !== null;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") {
        return;
      }
      const newTodo = {
        id: this.nextTodoId,
        text: this.newTodo.trim(),
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      this.editTodoId = todo.id;
      this.editTodoText = todo.text;
    },
    updateTodo() {
      const todo = this.todos.find(t => t.id === this.editTodoId);
      if (todo) {
        todo.text = this.editTodoText.trim();
      }
      this.editTodoId = null;
      this.editTodoText = "";
    },
    cancelEdit() {
      this.editTodoId = null;
      this.editTodoText = "";
    }
  }
};
</script>

