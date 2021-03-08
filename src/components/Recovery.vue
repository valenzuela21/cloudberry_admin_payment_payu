<template>
  <div class="columns p-5 bg-login with-login">
    <div class="column card is-half is-offset-one-quarter mt-6">
      <img class="logo-login" :src="require('@/../static/logo.png')">
      <form
        id="app"
      >
        <section>
          <b-field label="Correo electrónico"
                   :type="this.error.email_type"
                   :message="this.error.email ">
            <b-input type="email" v-model="email" placeholder="Ingresa el correo electrónico" >
            </b-input>
          </b-field>
        </section>
        <section>
          <div class="column">
            <button class="button is-danger is-center is-normal margin-auto" @click="recoveryPass" >Recuperar Contraseña</button>
          </div>
        </section>
        <p v-html="msgError"></p>
      </form>
      <p class="has-text-centered is-size-7 mt-3">He recuperado la contraseña. <router-link to="/" class="is-size-7" > Iniciar Sesión </router-link></p>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Recovery',
  data () {
    return {
      email: null,
      error: [],
      msgError: ''
    }
  },
  methods: {
    recoveryPass (e) {
      e.preventDefault()
      this.error = []
      if (!this.email) {
        this.error.email = 'Ingresa el correo electrónico'
        this.error.email_type = 'is-danger'
      } else {
        const URL_RECOVERY_PASSWORD = 'http://comunicacionescloudberry.com/payment/Api/recovery_account'
        let data = {'email': this.email}
        axios.post(URL_RECOVERY_PASSWORD, data)
          .then((resp) => {
            if (resp.data.type !== 'Error') {
              this.msgError = '<div class="alert-success-email-recovery">Se envio nuevos datos a este correo electrónico.</div>'
            } else {
              this.msgError = '<div class="alert-error-email-recovery">Este correo electrónico no existe.</div>'
            }
          }).catch((error) => console.log(error))
      }
    }
  }
}
</script>
<style scoped>
  .margin-auto {
    margin: auto;
    text-align: center;
    display: block;
  }
  .with-login{
    max-width: 790px;
    margin: auto;
  }
  .logo-login {
    margin: auto;
    text-align: center;
    display: block;
    width: 270px;
  }
</style>
