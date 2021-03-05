<template>
  <div class="columns p-5 bg-login with-login">
    <div class="column card is-half is-offset-one-quarter mt-6">
      <img class="logo-login" :src="'./static/logo.png'">
      <div v-html="alert_login" ></div>
      <form
        id="app"
        @submit.prevent="onSubmit"
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
      </form>
      <p class="has-text-centered is-size-7 mt-3">He recuperado la contraseña. <router-link to="/" class="is-size-7" > Iniciar Seción </router-link></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Recovery',
  data () {
    return {
      email: null,
      error: []
    }
  },
  methods: {
    recoveryPass () {
      this.error = []
      if (!this.email) {
        this.error.email = 'Ingresa el correo electrónico'
        this.error.email_type = 'is-danger'
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
