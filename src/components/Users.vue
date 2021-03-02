<template>
  <div>
  <Navbar/>
  <section class="section">
    <template v-if="userInfo.permision === '1'" >
      <TableUsers/>
    </template>
    <template v-if="userInfo.permision === '0'" >
          <p>No estas permitido ver esta pagina</p>
    </template>
  </section>
  </div>
</template>

<script>
import Navbar from './layout/Navbar'
import TableUsers from './layout/TableUsers'

import {mapState} from 'vuex'
import session from '../mixins/session'

export default {
  name: 'Users',
  mixins: [session],
  data () {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10
    }
  },
  components: {
    Navbar,
    TableUsers
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>

</style>
