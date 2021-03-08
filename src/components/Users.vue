<template>
  <div>
  <Navbar/>
  <section class="section">
    <template v-if="userInfo.permision === '1'" >
      <TableUsers/>
    </template>
    <template v-if="userInfo.permision === '0'" >
      <div>
        <img class="image-block" :src="require('@/../static/block.png')" alt="block-page" />
          <p class="txt-block">No tienes permisos para ver esta pagina</p>
      </div>
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
  mixins: [session],
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.image-block{
  width: 250px;
  margin: auto;
  display: block;
}
.txt-block{
  text-align: center;
  color: #7e7e7e;
  margin-top:30px
}
</style>
