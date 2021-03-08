<template>
  <div class="columns p-5 bg-login with-login">
    <div class="column card is-half is-offset-one-quarter mt-6">
      <img class="logo-login" :src="require('@/../static/logo.png')">
      <div v-html="alert_login" ></div>
      <form
        id="app"
        @submit.prevent="onSubmit"
      >
      <section>
        <b-field label="Correo Electrónico"
                 :type="{ 'is-danger': hasError[0] === 'name' || hasError[0] === 'email'  ? true : false}"
                 :message="[{ 'Ingresa el usuario': hasError[0] === 'name' ? true : false },
                            { 'Error: Tiene que ser correo electronico': hasError[0] === 'email' ? true : false }]">
          <b-input placeholder="Ingresa el correo electrónico"
                   v-model="name"
                   name="name"
                   id="name" ></b-input>
        </b-field>

        <b-field label="Contraseña"
                 :type="{ 'is-danger': hasError[0] === 'password' ? true : false  }"
                 :message="{ 'Ingresa la contraseña': hasError[0] === 'password' ? true : false }">
          <b-input placeholder="************"
                   v-model="password"
                   name="password"
                   id="password"
                   type="password"
                   password-reveal
          ></b-input>
        </b-field>
      </section>
      <section>
        <div class="column">
          <button class="button is-danger is-center is-normal margin-auto">Ingresa Cuenta</button>
        </div>
      </section>
      </form>
      <p class="has-text-centered is-size-7 mt-3">Has perdido la contraseña, <router-link to="/recovery" class="is-size-7" > recupera la cuenta. </router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      hasError: [],
      name: null,
      password: null,
      alert_login: ''
    }
  },
  methods: {
    onSubmit () {
      this.hasError = []

      if (!this.name) {
        this.hasError.push('name')
      } else if (!this.validateName(this.name)) {
        this.hasError.push('email')
        return
      }
      if (!this.password) {
        this.hasError.push('password')
      }

      const URL_API_LOGIN = 'http://comunicacionescloudberry.com/payment/Api/login'
      let data = JSON.stringify({'email': this.name, 'password': this.password})

      let config = {
        method: 'post',
        url: URL_API_LOGIN,
        data
      }
      if (this.name && this.password) {
        axios(config)
          .then((response) => {
            let result = response.data
            if (result.token === '' && result.res !== 'success') {
              this.alert_login = '<div style="    background: #e30c3b;\n' +
                '    color: #fff;\n' +
                '    padding: 8px;\n' +
                '    text-align: center;\n' +
                '    font-size: 14px;\n' +
                '    margin-bottom: 10px;">Error de usuario y contraseña de esta cuenta</div>'
            } else {
              this.alert_login = ''
              let dataProfile = {
                'token': result.token,
                'id': result.data.id_user
              }
              this.$localStorage.set('token_cloudberry', JSON.stringify(dataProfile))
              this.$router.push('admin')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    validateName: function (email) {
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      return re.test(email)
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
