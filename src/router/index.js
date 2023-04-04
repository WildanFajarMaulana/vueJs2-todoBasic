import Vue from 'vue';
import Router from 'vue-router';
import CrudOptionTodo from '@/components/CrudOptionTodo';
import CrudCompositeTodo from '@/components/CrudCompositeTodo';
import CrudWithApiTodo from '@/components/CrudWithApiTodo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CrudOptionTodo',
      component: CrudOptionTodo,
    },
    {
      path: '/options-api',
      name: 'CrudCompositeTodo',
      component: CrudCompositeTodo,
    },
  ],
});
