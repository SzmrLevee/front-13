import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@views/todos/TodoList.vue'
import Profile from '@views/profile/Profile.vue'
import Contact from '@views/contact/Contact.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', redirect: '/todos' },
    { path: '/todos', name: 'todos', component: TodoList },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/contact', name: 'contact', component: Contact }
  ]
})
