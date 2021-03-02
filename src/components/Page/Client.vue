<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="card m-2">
          <div class="card-content">
            <div class="columns is-mobile">
              <div class="column is-4-mobile  is-2-desktop mt-1"><img :src="'./static/icon-logo.png'" class="icon-image" alt="icon"/></div>
              <div class="column is-four-fifths mt-1">
                <h2>vlzdavid12@outlook.com</h2>
                <p class="is-size-7">David Fernnando Valenzuela Pardo</p>
                <p class="is-size-7">CC. 10190299941</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="content">
          <div class="columns">
            <div class="column is-three-fifths">
            </div>
            <div class="column">
              <b-button type="is-danger"
                        size="is-normal"
                        class="buttom-payment"
                        icon-left="currency-usd"
                        @click="isModalPayment = true" >
                Pagar Ahora
              </b-button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
        <TableClient/>
    </section>
    <b-modal :width="490" v-model="isModalPayment">
      <div class="card">
        <div class="card-content">
          <FormPayment/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import TableClient from '../layout/TableClient'
import FormPayment from '../layout/FormPayment'
export default {
  name: 'Client',
  data () {
    return {
      isModalPayment: false
    }
  },
  components: {
    TableClient,
    FormPayment
  }
}
</script>

<style scoped>
.icon-image {
  border-radius: 50px;
  -webkit-box-shadow: 0px 0px 14px 0px rgba(224, 224, 224, 1);
  -moz-box-shadow: 0px 0px 14px 0px rgba(224, 224, 224, 1);
  box-shadow: 0px 0px 14px 0px rgba(224, 224, 224, 1);
  padding: 10px;
  width: 70px;
}
.buttom-payment{
  margin-top: 22px;
}
</style>
