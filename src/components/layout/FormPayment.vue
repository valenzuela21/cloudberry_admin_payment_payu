<template>
  <div>
    <form method="post" @submit="checkForm"
          action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
          ref="form_payment"
    >
      <input name="merchantId"    type="hidden"  :value="payu.merchanid" >
      <input name="accountId"     type="hidden"  :value="payu.accountid" >
      <input name="description"   type="hidden"  :value="formEdit.service.service" >
      <input name="referenceCode" type="hidden"  :value="payu.referencecode" >
      <input name="amount"        type="hidden"  :value="total">
      <input name="tax"           type="hidden"  value="0" >
      <input name="taxReturnBase" type="hidden"  value="0" >
      <input name="currency"      type="hidden"  :value="payu.currency" >
      <input name="signature"     type="hidden"  :value="payu.firma"  >
      <input name="test"          type="hidden"  :value="formEdit.month" >
      <input name="buyerEmail"    type="hidden"  :value="formEdit.email" >
      <input name="buyerFullName"  type="hidden"  :value="formEdit.name" >
      <input name="responseUrl"    type="hidden"  value="http://www.test.com/response" >
      <input name="confirmationUrl"    type="hidden"  value="http://www.test.com/confirmation">

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
                    @input="onChangeHandle()"
                    icon="web"
                    expanded>
            <option value="">Seleccione el servicio</option>
            <option v-for="(item, index) in plansService"
                    :key="index" :value="{precin : item.total_month, service : item.product}"
            >{{item.id_sale}} - {{item.product}}</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Meses a Pagar"
                 :type="this.errors.month"
                 :message="this.errors.month">
          <b-select placeholder="Meses"
                    v-model="formEdit.month"
                    @input="onChangeHandle()"
                    icon="calendar-month"
                    class="is-size-7"
                    expanded>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <TableFactura :dataTable="[total, formEdit.service, formEdit.month]" ref="table_invoice" />
    <div class="buttons mt-5">
      <b-button type="is-primary"
                native-type="submit"
                expanded>
        Pagar Ahora
      </b-button>
    </div>
    </form>
  </div>
</template>

<script>
import TableFactura from './aditional/TableFactura'
import axios from 'axios'
import md5 from 'md5'
import { nanoid } from 'nanoid'
import {mapState} from 'vuex'
export default {
  name: 'FormPayment',
  data () {
    return {
      errors: [],
      plansService: [],
      token: null,
      formEdit: {
        name: null,
        cedula: null,
        email: null,
        phone: null,
        service: '',
        month: 1
      },
      total: '',
      payu: {}
    }
  },
  components: {
    TableFactura
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.searchPlan()
  },
  updated () {
    const {service, month} = this.formEdit

    if (service && month) {
      let Apikey = process.env.API_KEY_PAYU_ENV
      this.payu.merchanid = process.env.MERCHANT_ID_ENV
      this.payu.accountid = process.env.ACCOUNT_ID_ENV
      this.payu.referencecode = `TiendaVirtual-${nanoid(12)}`
      this.payu.amount = this.total
      this.payu.currency = 'COP'

      const {merchanid, referencecode, amount, currency} = this.payu

      this.payu.firma = md5(`${Apikey}~${merchanid}~${referencecode}~${amount}~${currency}`)
    }
  },
  methods: {
    onChangeHandle () {
      let total = parseInt(this.formEdit.month) * parseInt(this.formEdit.service.precin)
      if (isNaN(total)) {
        this.total = 0
      } else {
        this.total = total
      }
      setTimeout(() => {
        this.$refs.table_invoice.c1method()
      }, 500)
    },
    checkForm (e) {
      this.errors = []
      const {name, cedula, email, phone, service, month} = this.formEdit

      if (name && cedula && email && phone && service && month) {
        return true
      }

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

      e.preventDefault()
    },
    async searchPlan () {
      const URL_PLANS_USER_SUBCRIPTION = `http://comunicacionescloudberry.com/payment/Api/plans/${this.userInfo.id_user}`
      let result = await axios.get(URL_PLANS_USER_SUBCRIPTION, {
        headers: {
          'Authorization': `${this.token.token}`
        }
      })
      if (result) {
        this.plansService = result.data
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
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
