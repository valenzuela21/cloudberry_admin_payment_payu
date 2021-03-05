<template>
  <div>
    <img :src="'./static/logo.png'" class="img-logo-payment" >
    <div class="columns">
      <div class="column">
    <b-field label="Nombre del titular"
             :type="this.errors.name_type"
             :message="this.errors.name">
      <b-input v-model="formEdit.name"
               placeholder="Ingresa el nombre completo"
      ></b-input>
    </b-field>
      </div>
      <div class="column">
    <b-field label="Cedula o Identificación"
             :type="this.errors.cedula_type"
             :message="this.errors.cedula"
    >
      <b-input v-model="formEdit.cedula"
               placeholder="Ingresa el número de identificación"
               type="is-success"
               message="Ingresa el nombre completo"
      ></b-input>
    </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
    <b-field label="Correo electrónico"
             :type="this.errors.email_type"
             :message="this.errors.email">
      <b-input type="email"
               v-model="formEdit.email"
               placeholder="Ingresa correo del pagante">
      </b-input>
    </b-field>
      </div>
      <div class="column">
    <b-field label="Número telefóncio"
             :type="this.errors.phone_type"
             :message="this.errors.phone">
      <b-input type="number"
               v-model="formEdit.phone"
               placeholder="Ingresa el número mobil del pagante"
      ></b-input>
    </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field label="Plan a pagar"
                 :type="this.errors.service_type"
                 :message="this.errors.service">
          <b-select placeholder="Servicio"
                    class="is-size-7"
                    v-model="formEdit.service"
                    icon="web"
                    expanded>
            <option value="">Seleccione el servicio</option>
            <option value="1">TiendaVirtual-J9Jydh0Ahfl3 Plan Service</option>
            <option value="2">TiendaVirtual-J9Jydh0Ahfl3 Plan Service 2</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Meses a Pagar"
                 :type="this.errors.month"
                 :message="this.errors.month">
          <b-select placeholder="Meses"
                    v-model="formEdit.month"
                    icon="web"
                    class="is-size-7"
                    expanded>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2">3</option>
            <option value="2">4</option>
            <option value="2">5</option>
            <option value="2">6</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <TableFactura />
    <div class="buttons mt-5">
      <b-button type="is-primary"
                @click="paymentUserCloud"
                expanded>
        Pagar Ahora
      </b-button>
    </div>
  </div>
</template>

<script>
import TableFactura from './aditional/TableFactura'
export default {
  name: 'FormPayment',
  data () {
    return {
      errors: [],
      formEdit: {
        name: null,
        cedula: null,
        email: null,
        phone: null,
        service: '',
        month: 1
      }
    }
  },
  components: {
    TableFactura
  },
  methods: {
    paymentUserCloud () {
      this.errors = []
      const {name, cedula, email, phone, service, month} = this.formEdit
      if (!name) {
        this.errors.name = 'Ingrese el nombre completo'
        this.errors.name_type = 'is-danger'
      }
      if (!cedula) {
        this.errors.cedula = 'Ingresa el número de identificación o cedula'
        this.errors.cedula_type = 'is-danger'
      }
      if (!email) {
        this.errors.email = 'Ingresa el correo electrónico'
        this.errors.email_type = 'is-danger'
      }
      if (!phone) {
        this.errors.phone = 'Ingresa el número telefonico'
        this.errors.phone_type = 'is-danger'
      }
      if (!service) {
        this.errors.service = 'Ingresa el servicio completo'
        this.errors.service_type = 'is-danger'
      }
      if (!month) {
        this.errors.month = 'Ingresa la cantidad de meses que deseas pagar'
        this.errors.month_type = 'is-danger'
      }
    }
  }
}
</script>

<style scoped>
  .select select, .taginput .taginput-container.is-focusable, .textarea, .input{
    color: #909090!important;
  }
  .img-logo-payment{
    width: 200px;
    margin: auto;
    display: block;
    margin-bottom: 30px;
  }
</style>
