import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Inicio from '../components/Inicio'
import Users from '../components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Inicio
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '*',
      component: Login
    }

  ]
})
