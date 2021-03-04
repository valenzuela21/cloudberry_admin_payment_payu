<template>
  <div>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <router-link to="admin"><img
          :src="'/static/logo.png'"
          alt="cloudbery-creative"
        ></router-link>
      </b-navbar-item>
    </template>
    <template #start>
        <router-link class="navbar-item" to="/users" v-if="userInfo.permision === '1'">
          Usuarios
        </router-link>
    </template>

    <template #end>
      <b-dropdown
        position="is-bottom-left"
        append-to-body
        aria-role="menu">
        <template #trigger>
          <a
            class="navbar-item"
            role="button">
            <b-icon
              icon="account"
              class="profile-icon">
            </b-icon>
            <span>Perfil</span>
            <b-icon icon="menu-down"></b-icon>
          </a>
        </template>
        <b-dropdown-item custom aria-role="menuitem">
          Cuenta:
          <span v-if="userInfo.permision === '1'" class="tag is-success">Administrador</span>
          <span v-else class="tag is-danger">Usuario</span>
          <b>{{userInfo.email}}</b>
        </b-dropdown-item>
        <hr class="dropdown-divider" aria-role="menuitem">
        <b-dropdown-item value="settings">
         <router-link to="/settings"><b-icon  icon="hammer-screwdriver"></b-icon>
         Configuración</router-link>
        </b-dropdown-item>
        <b-dropdown-item value="logout" @click="logout" aria-role="menuitem">
          <b-icon icon="logout"></b-icon>
          Cerra Session
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-navbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Navbar',

  methods: {
    logout () {
      this.$localStorage.remove('token_cloudberry')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.$store.dispatch('getInfoProfile')
  }
}
</script>

<style scoped>
  .navbar-item img{
    max-height: 3.75rem!important;
  }
  .profile-icon{
    font-size: 10px;
    padding-right: 10px;
  }
</style>
