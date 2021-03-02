<template >
  <div>
    <Navbar/>
    <div class="section">
    <template v-if="userInfo.permision === '1'">
      <Invoice/>
      </template>
      <template v-if="userInfo.permision === '0'">
        <Client/>
      </template>
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar'
import Invoice from './Page/Invoice'
import session from '../mixins/session'
import Client from './Page/Client'

import {mapState} from 'vuex'

export default {
  name: 'Inicio',
  components: {
    Navbar,
    Invoice,
    Client
  },
  mixins: [session],
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>

</style>
