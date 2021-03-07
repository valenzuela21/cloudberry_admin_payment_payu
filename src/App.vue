<template>
  <div>
  <div id="app" class="paper-container">
    <router-view/>
  </div>
  <Footer/>
  </div>
</template>

<script>
import Footer from './components/layout/Footer'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    Footer
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    token = JSON.parse(token)

    /** Validate Token **/
    if (token.token || token.token === '') {
      if (this.$route.path !== '/admin') {
        this.$router.push('/admin')
      }
    } else {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="scss">
  .label{
    color: #888!important;
    font-size: 12px!important;
  }
 html{
    background: #e1e1e1!important;
  }
  .b-table .table th .th-wrap{
    font-size: 12px!important;
  }
  a{
    color: #2a3c77!important;
  }
  .pagination-link.is-current{
    background-color: #fff!important;
    border-color: #fff!important;
  }
  .b-table .table-wrapper.has-mobile-cards tr td{
    font-size: 12px!important;
  }
  .paper-container{
    height: 990px;
  }
  a.dropdown-item.is-active, .dropdown .dropdown-menu .has-link a.is-active, button.dropdown-item.is-active{
    background: #fff!important;
  }
  .alert-error-email-recovery{
    background: #ff315a;
    color: #fff;
    text-align: center;
    padding: 10px;
  }
  .alert-success-email-recovery{
    background: #1bb075;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

  @media screen and (max-width: 1125px) {
    .paper-container{
      height: 1050px;
    }
  }
  @media screen and (max-width: 790px ) {
    .paper-container{
      height: 100%;
    }
  }
</style>
