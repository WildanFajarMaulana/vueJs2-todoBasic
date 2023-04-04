<template>
    <div id="todo-app">
      <h1>Todo List With Option Api</h1>
      <form @submit.prevent="addTodo">
        <input v-model="state.newTodo" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(todo, index) in state.todos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(index)">X</button>
          <button @click="editTodo(todo)">Edit</button>
        </li>
      </ul>
      <div v-if="editMode">
        <form @submit.prevent="updateTodo">
          <input v-model="state.editTodoText" />
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, computed } from 'vue';
  
  export default {
    name: "CrudOptionsApiTodo",
    setup() {
      const state = reactive({
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
      });
  
      const nextTodoId = computed(() => {
        const lastTodo = state.todos[state.todos.length - 1];
        return lastTodo ? lastTodo.id + 1 : 1;
      });
  
      const editMode = computed(() => {
        return state.editTodoId !== null;
      });
  
      const addTodo = () => {
        if (state.newTodo.trim() === "") {
          return;
        }
        const newTodo = {
          id: nextTodoId.value,
          text: state.newTodo.trim(),
          completed: false
        };
        state.todos.push(newTodo);
        state.newTodo = "";
      };
  
      const removeTodo = (index) => {
        state.todos.splice(index, 1);
      };
  
      const editTodo = (todo) => {
        state.editTodoId = todo.id;
        state.editTodoText = todo.text;
      };
  
      const updateTodo = () => {
        const todo = state.todos.find(t => t.id === state.editTodoId);
        if (todo) {
          todo.text = state.editTodoText.trim();
        }
        state.editTodoId = null;
        state.editTodoText = "";
      };
  
      const cancelEdit = () => {
        state.editTodoId = null;
        state.editTodoText = "";
      };
  
      return {
        state,
        nextTodoId,
        editMode,
        addTodo,
        removeTodo,
        editTodo,
        updateTodo,
        cancelEdit
      }
    }
  };
  </script>
  
