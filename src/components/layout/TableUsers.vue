<template>
  <div>
    <section class="section">
      <b-table
        :paginated="isPaginated"
        :data="data"
        :current-page.sync="currentPage"
        :per-page="perPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">

        <b-table-column field="id_user" label="Número Cedula" width="40"  v-slot="props">
          <span class="is-size-7">{{ props.row.id_user }}</span>
        </b-table-column>

        <b-table-column field="name_user" label="Nombre Completo" width="40"  v-slot="props">
          <span class="is-size-7">{{ props.row.name_user }}</span>
        </b-table-column>

        <b-table-column field="email" label="Correo electrónico" width="40"  v-slot="props">
          <span class="is-size-7">{{ props.row.email }}</span>
        </b-table-column>

        <b-table-column field="permission" label="Permisos" width="40"  v-slot="props">
          <span class="is-size-7" :class="props.row.permision === '1' ? 'tag is-success' : 'tag is-danger'" >{{ permision(props.row.permision) }}</span>
        </b-table-column>

        <b-table-column field="created_at" label="Fecha Creación" width="40"  v-slot="props">
          <span class="tag">{{ props.row.created_at }}</span>
        </b-table-column>

        <b-table-column field="updated_at" label="Fecha Actualización" width="40"  v-slot="props">
          <span class="tag">{{ props.row.updated_at }}</span>
        </b-table-column>
        <b-table-column field="options" label="Opciones" width="40"  v-slot="props">
          <div class="buttons" v-if="props.row.permision === '0'">
            <b-button type="is-primary"
                      icon-left="lead-pencil"
                      @click="editUser(props.row.id)" />
            <b-button type="is-success"
                      icon-left="currency-usd" />
          </div>
        </b-table-column>
      </b-table>
    </section>
    <b-modal v-model="isEditModalActive">

    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TableUsers',
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
      perPage: 10,
      isEditModalActive: false
    }
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    token = JSON.parse(token)
    this.consultUser(token)
  },
  methods: {
    consultUser (_token) {
      const URL_USERS_REGISTER = 'http://comunicacionescloudberry.com/payment/Api/users/'
      axios.get(URL_USERS_REGISTER, {
        headers: {
          'Authorization': `${_token.token}`
        }
      }).then((response) => {
        console.log(response)
        this.data = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    editUser (_iduser) {
      console.log(_iduser)
    },
    permision (value) {
      if (value === '1') {
        return 'Administrador'
      } else {
        return 'Usuario'
      }
    }
  }
}
</script>
