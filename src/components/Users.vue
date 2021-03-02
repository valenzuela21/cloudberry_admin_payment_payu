<template>
  <div>
  <Navbar/>
  <section class="section">
      <div v-if="userInfo.permision === '1'">
          <TableUsers/>
      </div>
      <div v-else>
          <p>No estas permitido ver esta pagina</p>
      </div>
  </section>
  </div>
</template>

<script>
import Navbar from './layout/Navbar'
import TableUsers from './layout/TableUsers'

import {mapState} from 'vuex'

export default {
  name: 'Users',
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
