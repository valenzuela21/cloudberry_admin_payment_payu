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
                <img :src="'/static/logo.png'" alt="image-logo" class="logo-factura" />
              </div>
              <div class="column">
                <h2 class="text-align-right">Factura</h2>
              </div>
            </div>
          </div>
          <hr class="spacer"/>
          <div class="row">
            <div class="column">
              <strong>Fecha:</strong> 2021-03-06 07:30:18
            </div>
            <div class="column text-align-right">
              <strong>Número Pedido:</strong> TiendaVirtual-joS4DGU4J2Xz
            </div>
          </div>
          <hr class="spacer"/>
          <div class="row">
            <div class="column">
              <ul>
                <li><strong>Nombre:</strong> Estefani Colombia</li>
                <li><strong>Mobil:</strong> 213213</li>
                <li><strong>Correo electrónico:</strong> estefani@gamil.com</li>
                <li><strong>Empresa:</strong></li>
                <li><strong>Identificación:</strong> 213123123</li>
                <li><strong>Url Documento:</strong></li>
              </ul>
            </div>

            <div class="column">
              <ul class="text-align-right">
                <li><strong>Tipo factura:</strong> Inicial</li>
                <li><strong>Producto:</strong> Plan service</li>
                <li><strong>Dominio:</strong> No</li>
                <li><strong>Certificado:</strong> No</li>
                <li><strong>Meses:</strong> 1</li>
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
                <td>Plan service</td>
                <td>1</td>
                <td>$10000</td>
              </tr>
              <tr>
                <td>Plan service</td>
                <td>1</td>
                <td>$10000</td>
              </tr>
              <tr>
                <td></td>
                <td><h4>Total</h4></td>
                <td><h4>$10000</h4></td>
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

export default {
  name: 'Print',
  mixins: [session],
  methods: {
    printSection (e) {
      e.preventDefault()
      this.$htmlToPaper('printSection')
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

</style>
