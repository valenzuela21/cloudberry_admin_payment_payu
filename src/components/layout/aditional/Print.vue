<!-- PrintStuff.vue -->
<template>
  <div>
  <v-btn small color="primary" @click="printSection">
    <div class="buttons content-center">
      <b-button  @click="(e)=> this.$router.back()"
                icon-right="printer-settings"
                size="is-normal"
                type="is-link">
        Imprimir
      </b-button>
    </div>
  </v-btn>
  <div class="content">
    <div id="printSection">
        <div class="invoice-container">
          <div>
            <div class="row">
              <div class="column">
                <img :src="require('@/../static/logo.png')" alt="image-logo" class="logo-factura" />
              </div>
              <div class="column">
                <h2 class="text-align-right">Factura</h2>
              </div>
            </div>
          </div>
          <hr class="spacer"/>
          <div class="row">
            <div class="column">
              <strong>Fecha:</strong> {{ data.created_at }}
            </div>
            <div class="column text-align-right">
              <strong>Número Pedido:</strong>
              <br>
              {{ data.id_sale }}
            </div>
          </div>
          <hr class="spacer"/>
          <div class="row">
            <div class="column">
              <ul>
                <li><strong>Nombre:</strong> {{ data.name }}</li>
                <li><strong>Mobil:</strong> {{ data.mobil }}</li>
                <li><strong>Correo electrónico:</strong> {{ data.email }}</li>
                <li><strong>Empresa:</strong>{{ data.business }}</li>
                <li><strong>Identificación:</strong> {{ data.cedula }}</li>
              </ul>
            </div>

            <div class="column">
              <ul class="text-align-right">
                <li><strong>Tipo factura:</strong>{{ data.plan }}</li>
                <li><strong>Dominio:</strong> {{ data.domain }}</li>
                <li><strong>Certificado:</strong> {{ data.certificado }}</li>
                <li><strong>Meses:</strong> {{ data.month }}</li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Detalles del pedido</h3>
            <table>
              <tr>
                <th>Servicio</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
              <tr>
                <td>{{ data.product }}</td>
                <td>{{ data.month}}</td>
                <td>{{formatCurrency("es-CO", "COP", 0, data.total_month)}}</td>
              </tr>
              <tr>
                <td>
                  Dominio
                  <div>
                    <span v-if="data.domain === 'Si'"> <strong class="tag-span">Transferencia Dominio</strong></span>
                    <span v-else><strong  class="tag-span-domain">Adquirir Nuevo Dominio</strong></span>
                  </div>
                </td>
                <td>1</td>
                <td>$69.900</td>
              </tr>
              <tr v-if="data.certificado ===  'No'">
                <td>Certificado SSL</td>
                <td>1</td>
                <td>$99.900</td>
              </tr>
              <tr>
                <td></td>
                <td><h4>Total</h4></td>
                <td><h4>{{formatCurrency("es-CO", "COP", 0, data.total)}}</h4></td>
              </tr>
            </table>
            <hr>
            <p class="text-align-center"><strong>Telefónos:</strong> (1) 841 8808 / 300 579 8099 - <br> <strong>Web:</strong> creativo.cloudberry.com.co - <strong>Email:</strong> atencionalcliente@cloudberry.com.co </p>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import session from '../../../mixins/session'
import axios from 'axios'
export default {
  name: 'Print',
  mixins: [session],
  data () {
    return {
      data: [],
      token: ''
    }
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.consultInvoice()
    console.log(this.$route.query.sale)
  },
  methods: {
    async consultInvoice () {
      const URL_INVOICE = `http://comunicacionescloudberry.com/payment/Api/registro_invoice/${this.$route.query.sale}`
      let resp = await axios.get(URL_INVOICE, {
        headers: {
          'Authorization': `${this.token.token}`
        }
      })
      this.data = resp.data[0]
    },
    printSection (e) {
      e.preventDefault()
      this.$htmlToPaper('printSection')
    },
    formatCurrency (locales, currency, fractionDigits, number) {
      let formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
      }).format(number)
      return formatted
    }
  }
}
</script>

<style scoped>

  .column {
    float: left;
    width: 50%;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  .invoice-container{
    margin: 15px auto;
    padding: 70px;
    max-width: 770px;
    background-color: #fff;
    border: 1px solid #ccc;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    -o-border-radius: 6px;
    border-radius: 6px;
    font-size: 14px;
  }

  .text-align-right{
    text-align: right;
  }
  .text-align-center{
    text-align: center;
  }

  .logo-factura{
    width: 200px;
  }

  .spacer{
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
  }

  ul{
    padding: 0px;
    margin: 0px;
    list-style: none;
  }
  table {
    font-family: "Poppins", sans-serif;
    width: 100%;
    margin-top: 30px;
    border-collapse: collapse;
    border-radius: 4em;
    overflow: hidden;
    border-radius: 5px;
  }

  td, th {
    border-top: 1px solid #e3e3e5;
    text-align: left;
    padding: 8px;
    font-weight: normal;
  }

  tr:nth-child(even) {
    background-color: #f8f8fa;
  }

  .content-center{
    margin: auto;
    text-align: center;
    display: block;
    margin-top: 20px;
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
