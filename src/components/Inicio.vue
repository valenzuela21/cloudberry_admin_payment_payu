<template>
  <div>
    <Navbar/>
    <div class="section">
      <div v-if="userInfo.permision === '1'">
          <Invoice/>
      </div>
      <div v-else>
        <p>Pagina del usuario</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar'
import Invoice from './Page/Invoice'
import session from '../mixins/session'

import {mapState} from 'vuex'

export default {
  name: 'Inicio',
  components: {
    Navbar,
    Invoice
  },
  mixins: [session],
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>

</style>
