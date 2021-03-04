<template>
  <div>
    <b-loading :is-full-page="true" v-model="isLoading" ></b-loading>
    <section class="section">
      <template>
        <b-input
          placeholder="Search..."
          icon="magnify"
          class="mb-4"/>
      </template>

      <b-table
        :paginated="isPaginated"
        :data="data"
        :current-page.sync="currentPage"
        :per-page="perPage"
        :default-sort-direction="defaultSortDirection"
        ref="table"
        default-sort="updated_at"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">

        <b-table-column field="id_user" label="Número Cedula" width="40"  v-slot="props">
          <span class="is-size-7">{{ props.row.cedula }}</span>
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

        <b-table-column field="created_at" label="Fecha Creación" width="40" sortable  v-slot="props">
          <span class="tag">{{ props.row.created_at }}</span>
        </b-table-column>

        <b-table-column field="updated_at" label="Fecha Actualización" width="40" sortable  v-slot="props">
          <span class="tag">{{ props.row.updated_at }}</span>
        </b-table-column>
        <b-table-column field="options" label="Opciones" width="40"  v-slot="props">
          <div class="buttons" v-if="props.row.permision === '0'">
            <b-button type="is-primary"
                      icon-left="lead-pencil"
                      @click="modalEditUser(props.row.id)"/>
            <b-button tag="router-link"
                      :to="{ path: '/invoice_user/' + props.row.id_user }"
                      icon-left="currency-usd"
                      type="is-primary"
                      class="btn-invoice"/>
          </div>
        </b-table-column>
      </b-table>
    </section>
    <b-modal :width="640" v-model="enableModal" @close="closeEdit">
      <div class="card">
        <div class="card-content">
          <ModalEdit :formDataId="idEdit" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import ModalEdit from './aditional/ModalEdit'

export default {
  name: 'TableUsers',
  components: {
    ModalEdit
  },
  data () {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      isEditModalActive: false,
      idEdit: 0,
      token: null,
      enableModal: false,
      isLoading: false
    }
  },
  mounted () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.consultUser()
  },
  methods: {
    closeEdit () {
      this.$refs.table.refreshSlots()
      this.consultUser()
    },
    consultUser () {
      this.isLoading = true
      const URL_USERS_REGISTER = 'http://comunicacionescloudberry.com/payment/Api/users/'
      axios.get(URL_USERS_REGISTER, {
        headers: {
          'Authorization': `${this.token.token}`
        }
      }).then((response) => {
        console.log('Consulta satisfactoria!')
        this.data = response.data
        this.isLoading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    modalEditUser (_id) {
      this.idEdit = _id
      this.enableModal = true
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
<style scoped>
.btn-invoice{
  color: #fff !important;
}

</style>
