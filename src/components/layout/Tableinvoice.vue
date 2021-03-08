<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <Search/>
    <b-table
      :paginated="isPaginated"
      :data="data"
      :current-page.sync="currentPage"
      :per-page="perPage"
      :default-sort-direction="defaultSortDirection"
      default-sort="fecha"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >

      <b-table-column field="numero-pedido" label="Número Pedido" sortable width="120" v-slot="props">
        <span class="is-size-7">{{ props.row.id_sale }}</span>
      </b-table-column>

      <b-table-column field="nombre-completo" label="Nombre Completo" v-slot="props">

        <span class="is-size-7"> {{ props.row.name }}</span>

      </b-table-column>

      <b-table-column field="email" label="Email" v-slot="props">
        <span class="is-size-7"> {{ props.row.email }}</span>
      </b-table-column>

      <b-table-column field="telefono" label="Telefono" v-slot="props">
        <span class="is-size-7"> {{ props.row.mobil }}</span>
      </b-table-column>

      <b-table-column field="producto" label="Producto" v-slot="props">
        <span class="is-size-7"> {{ props.row.product }}</span>
      </b-table-column>

      <b-table-column field="type_invoice" label="Tipo Factura" sortable v-slot="props">
         <span class="tag">
        {{ props.row.plan === 'Yes'? 'Inicial' : 'Mensual' }}
         </span>
      </b-table-column>

      <b-table-column field="estado" label="Estado" width="100" v-slot="props">
         <span class="tag" :class="type(props.row.estado)">
        {{ props.row.estado }}
         </span>
      </b-table-column>

      <b-table-column field="fecha" label="Fecha" sortable v-slot="props">
         <span class="tag">
        {{ props.row.created_at }}
         </span>
      </b-table-column>
      <b-table-column field="opcions" label="Opciones" v-slot="props">
        <b-button
          class="options"
          icon-right="file-document-multiple"
          @click="consultInvoiceGeneral( props.row.id_sale )">
        </b-button>
        <b-button
          tag="router-link"
          class="options"
          :to="{  path: '/print', query: { sale: props.row.id_sale }   }"
          icon-right="printer">
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
              <p class="is-size-7"><b>Url Documento: </b> <a :href="data_details.document" target="_blank">{{data_details.document}}</a>
              </p>
            </div>
            <div class="column">
           <span><b-icon
             icon="shopping"
             class="icon-information">
            </b-icon>Pedido</span>
              <hr>
              <p class="is-size-7"><b>Número Pedido: </b> {{data_details.id_sale}} </p>
              <p class="is-size-7"><b>Fecha:</b> {{data_details.updated_at}} </p>
              <p class="is-size-7"><b>Producto: </b> {{data_details.product}} </p>
              <div class="is-size-7"><b>Dominio: </b> {{data_details.domain}}
                <div>
                  <span v-if="data_details.domain === 'Si'"> <strong class="tag-span">Transferencia Dominio</strong></span>
                  <span v-else><strong  class="tag-span-domain">Adquirir Nuevo Dominio</strong></span>
                </div>
              </div>
              <p class="is-size-7"><b>Certificado: </b>{{data_details.certificado}} </p>
              <p class="is-size-7"><b>Meses: </b>{{data_details.month}} </p>
              <p class="is-size-7"><span class="price-total">Total: {{formatterPeso(data_details.total)}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'
import Search from './aditional/Search'

export default {
  name: 'TableInvoice',
  components: {
    Search
  },
  data () {
    return {
      data: [],
      data_details: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 12,
      isDetailsModalActive: false,
      isLoading: false,
      token: ''
    }
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.consultInvoice()
  },
  methods: {

    consultInvoice () {
      this.isLoading = true
      const URL_INVOICE = 'http://comunicacionescloudberry.com/payment/Api/registro_invoice/'
      axios.get(URL_INVOICE, {
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
          if (response.data.resp === false && response.data.status === 401) {
            this.$localStorage.remove('token_cloudberry')
            this.$router.push('/')
          } else {
            this.data_details = response.data[0]
            this.isLoading = false
          }
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

  }

}
</script>

<style scoped>
  .icon-information {
    font-size: 22px;
    padding: 12px;
    color: #343434
  }

  .price-total {
    float: right;
    font-size: 20px;
    background: #d21139;
    padding: 5px 15px;
    color: #fff;
    border-radius: 4px;
  }
  .options {
    color: #6f6f6f!important;
  }
  .tag-span{
    background: #628b18;
    padding: 3px 8px;
    color: #fff;
    font-weight: 400;
    border-radius: 4px;
    font-size: 10px;
  }
  .tag-span-domain{
    background: #7957d5;
    padding: 3px 8px;
    color: #fff;
    font-weight: 400;
    border-radius: 4px;
    font-size: 10px;
  }

</style>
