<template>
    <div id="todo-app">
      <h1>Todo List With Class and Axios</h1>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(todo)">X</button>
          <button @click="editTodo(todo)">Edit</button>
        </li>
      </ul>
      <div v-if="editMode">
        <form @submit.prevent="updateTodo">
          <input v-model="editTodoText" />
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CrudWithApiTodo',
    data() {
      return {
        todos: [],
        newTodo: '',
        editTodoId: null,
        editTodoText: ''
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
    created() {
      this.fetchTodos();
    },
    methods: {
      fetchTodos() {
        axios.get('/api/todos')
          .then(response => {
            this.todos = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      addTodo() {
        if (this.newTodo.trim() === '') {
          return;
        }
        const newTodo = {
          text: this.newTodo.trim(),
          completed: false
        };
        axios.post('/api/todos', newTodo)
          .then(response => {
            this.todos.push(response.data);
            this.newTodo = '';
          })
          .catch(error => {
            console.error(error);
          });
      },
      removeTodo(todo) {
        axios.delete(`/api/todos/${todo.id}`)
          .then(response => {
            const index = this.todos.indexOf(todo);
            if (index !== -1) {
              this.todos.splice(index, 1);
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      editTodo(todo) {
        this.editTodoId = todo.id;
        this.editTodoText = todo.text;
      },
      updateTodo() {
        const todo = this.todos.find(t => t.id === this.editTodoId);
        if (todo) {
          axios.put(`/api/todos/${todo.id}`, { text: this.editTodoText.trim() })
            .then(response => {
              todo.text = response.data.text;
              this.editTodoId = null;
              this.editTodoText = '';
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      cancelEdit() {
        this.editTodoId = null;
        this.editTodoText = '';
      }
    }
  };
  </script>