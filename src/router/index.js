import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Inicio from '../components/Inicio'
import Users from '../components/Users'
import Config from '../components/Config'
import InvoiceUser from '../components/InvoiceUser'

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
      path: '/settings',
      name: 'settings',
      component: Config
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/invoice_user/:id',
      name: 'invoice_user',
      component: InvoiceUser
    },
    {
      path: '*',
      component: Login
    }

  ]
})
