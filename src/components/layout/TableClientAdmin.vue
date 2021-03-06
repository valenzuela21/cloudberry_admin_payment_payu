<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoading" ></b-loading>
    <div class="columns">
      <div class="column">
        <h2 class="title is-4"> <b-icon
          icon="file-settings"
          size="is-normal">
        </b-icon>Facturas</h2>
      </div>
      <div class="column">
        <div class="columns is-mobile">
          <div class="column is-3-mobile  is-3-tablet is-2-desktop is-2-fullhd">
            <img :src="'/static/icon-logo.png'" alt="icon-logo" class="image-logo-icon mt-5" />
          </div>
          <div class="column is-8">
            <p class="tag mb-2">{{txtpermision}}</p>
            <p class="is-size-7"> <strong>Id User:</strong> {{this.data_info.id_user}} </p>
            <p class="is-size-7"> <strong>Usuario:</strong> {{this.data_info.name_user}}</p>
            <p class="is-size-7"> <strong>Cédula:</strong> {{this.data_info.cedula}}</p>
            <p class="is-size-7"> <strong>Correo electrónico:</strong> {{this.data_info.email}}</p>
          </div>
        </div>
      </div>
    </div>
    <b-table
      :paginated="isPaginated"
      :data="data"
      :current-page.sync="currentPage"
      :per-page="perPage"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <b-table-column field="Número Pedido" label="Número Pedido" width="120" v-slot="props">
        <span class="is-size-7">{{ props.row.id_sale }}</span>
      </b-table-column>

      <b-table-column field="Número Cedula" label="Número Cedula" width="130" v-slot="props">
        <span class="is-size-7">{{ props.row.cedula }}</span>
      </b-table-column>

      <b-table-column field="Nombre Completo" label="Nombre Completo" v-slot="props">
        <span class="is-size-7"> {{ props.row.name }}</span>
      </b-table-column>

      <b-table-column field="Email" label="Email" v-slot="props">
        <span class="is-size-7"> {{ props.row.email }}</span>
      </b-table-column>

      <b-table-column field="Telefono" label="Telefono" v-slot="props">
        <span class="is-size-7"> {{ props.row.mobil }}</span>
      </b-table-column>

      <b-table-column field="Product" label="Producto" v-slot="props">
        <span class="is-size-7"> {{ props.row.product }}</span>
      </b-table-column>

      <b-table-column field="Estado" label="Estado"  width="100" v-slot="props">
         <span class="tag" :class="type(props.row.estado)" >
        {{ props.row.estado }}
         </span>
      </b-table-column>

      <b-table-column field="Fecha" label="Fecha" v-slot="props">
         <span class="tag">
        {{ props.row.created_at }}
         </span>
      </b-table-column>

      <b-table-column field="Opciones" label="Opciones" v-slot="props">

        <b-button
          icon-right="file-document-multiple"
          @click="consultInvoiceGeneral( props.row.id_sale )" >
        </b-button>

      </b-table-column>
    </b-table>

    <b-modal :width="640" v-model="isDetailsModalActive">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column">
            <span><b-icon
              icon="account"
              class="icon-information">
            </b-icon>Información</span>
              <hr/>
              <p class="is-size-7"><b>Nombre: </b> {{data_details.name}} </p>
              <p class="is-size-7"><b>Mobil: </b>{{data_details.mobil}} </p>
              <p class="is-size-7"><b>Correo electrónico: </b>{{data_details.email}} </p>
              <p class="is-size-7"><b>Empresa: </b>{{data_details.business}} </p>
              <p class="is-size-7"><b>Identificación: </b> {{data_details.type_document}} {{data_details.cedula}} </p>
              <p class="is-size-7"><b>Url Documento: </b> <a :href="data_details.document" target="_blank">{{data_details.document}}</a> </p>
            </div>
            <div class="column">
           <span><b-icon
             icon="shopping"
             class="icon-information">
            </b-icon>Pedido</span>
              <hr>
              <p class="is-size-7"><b>Número Pedido: </b> {{data_details.id_sale}} </p>
              <p class="is-size-7"><b>Fecha: </b>  {{data_details.updated_at}} </p>
              <p class="is-size-7"><b>Producto: </b> {{data_details.product}} </p>
              <p class="is-size-7"><b>Dominio: </b>  {{data_details.domain}}</p>
              <p class="is-size-7"><b>Certificado: </b>{{data_details.certificado}} </p>
              <p class="is-size-7"><b>Meses: </b>{{data_details.month}} </p>
              <p class="is-size-7"> <span class="price-total">Total: {{formatterPeso(data_details.total)}}</span> </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TableClientAdmin',
  props: ['idTable'],
  data () {
    return {
      data: [],
      data_details: [],
      data_info: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 8,
      isDetailsModalActive: false,
      token: null,
      isLoading: false
    }
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.consultInvoice()
    this.consultUser()
  },
  methods: {
    consultUser () {
      this.isLoading = true
      let id = this.idTable
      const URL_DATA_USER = `http://comunicacionescloudberry.com/payment/Api/users/${id}`
      axios.get(URL_DATA_USER, { headers: {
        'Authorization': `${this.token.token}`
      }}).then((response) => {
        this.data_info = response.data[0]
        this.isLoading = false
      })
        .catch((error) => console.log(error))
    },

    consultInvoice () {
      this.isLoading = true
      let id = this.idTable
      const URL_INVOICE_USER = `http://comunicacionescloudberry.com/payment/Api/invoices_user/${id}`
      axios.get(URL_INVOICE_USER, {
        headers: {
          'Authorization': `${this.token.token}`
        }
      })
        .then((response) => {
          this.data = response.data
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    consultInvoiceGeneral (idsale) {
      this.isLoading = true
      let config = {
        method: 'get',
        url: 'http://comunicacionescloudberry.com/payment/Api/registro_invoice/' + `${idsale}`,
        headers: {
          'Authorization': `${this.token.token}`
        }
      }
      axios(config)
        .then((response) => {
          this.isDetailsModalActive = true
          this.data_details = response.data[0]
          this.isLoading = false
        }).catch((error) => {
          this.isDetailsModalActive = false
          console.log(error)
        })
    },

    type (value) {
      const aproved = value
      if (aproved === 'Transacción Rechazada') {
        return 'is-danger'
      } else if (aproved === 'Transacción Proceso') {
        return 'is-primary'
      } else if (aproved === 'Transacción Aprobada') {
        return 'is-success'
      }
    },

    formatterPeso (value) {
      let formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })

      return formatter.format(value)
    }

  },
  computed: {

    txtpermision: function () {
      let permission
      if (this.data_info.permision === '1') {
        permission = 'Administrador'
      } else {
        permission = 'Usuario'
      }
      return permission
    }
  }

}
</script>

<style scoped>
.icon-information{
  font-size: 22px;
  padding: 12px;
  color: #343434
}
.price-total{
  float: right;
  font-size: 20px;
  background: #d21139;
  padding: 5px 15px;
  color: #fff;
  border-radius: 4px;
}
.image-logo-icon{
  width: 80px;
  margin: auto;
  background: #fff;
  border-radius: 100px;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
  box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
}
</style>
