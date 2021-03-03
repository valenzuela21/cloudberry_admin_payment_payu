<template>
  <div>
    <Navbar/>
    <div class="section">
      <template v-if="userInfo.permision === '1'">
        <TableClientAdmin :idTable="$route.params.id"/>
      </template>
      <template v-if="userInfo.permision === '0'">
        <div>
          <img class="image-block" :src="'./static/block.png'" alt="block-page"/>
          <p class="txt-block">No tienes permisos para ver esta pagina</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import session from '../mixins/session'
import TableClientAdmin from './layout/TableClientAdmin'
import Navbar from './layout/Navbar'
import {mapState} from 'vuex'

export default {
  name: 'InvoiceUser',
  mixins: [session],
  components: {
    TableClientAdmin,
    Navbar
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>

</style>
