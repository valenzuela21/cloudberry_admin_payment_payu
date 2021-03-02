<template>
  <div>
    <b-modal :width="640" v-model="modalActive">
      <div class="card">
        <div class="card-content">
          <form @submit.prevent="checkEditUser">
            <b-field label="Nombre Completo"
                     type="is-danger"
                     message="Ingresa el nombre usuario">
              <b-input v-model="name">
              </b-input>
            </b-field>
            <b-field label="Correo Electrónico"
                     type="is-danger"
                     message="Ingresa el correo electrónico">
              <b-input type="email"
                       v-model="email">
              </b-input>
            </b-field>
            <b-field label="Contraseña">
              <b-input type="password"
                       v-model="password"
                       password-reveal>
              </b-input>
            </b-field>
            <div class="block mt-5">
              <b-radio v-model="permission"
                       name="permision"
                       native-value="1">
                Administrador
              </b-radio>
              <b-radio v-model="permission"
                       name="permision"
                       native-value="0">
                Usuario
              </b-radio>
            </div>
            <div class="columns is-vcentered">
              <div class="column is-8">
              </div>
              <div class="column">
                <input
                  type="submit"
                  value="Guardar Cambios"
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <b-button type="is-primary"
              icon-left="lead-pencil"
              @click="modalActive = true"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalEdit',
  props: ['formModalID'],
  data () {
    return {
      id: this.formModalID,
      modalActive: false
    }
  },
  methods: {
    checkEditUser () {
      let token = this.$localStorage.get('token_cloudberry')
      let _token = JSON.parse(token)
      let data = {'name': this.name, 'contrasena': this.contrasena, 'email': this.email, 'permision': this.permission}
      let config = {
        method: 'put',
        url: `http://comunicacionescloudberry.com/payment/Api/user/${this.id}`,
        headers: {
          'Authorization': `${_token.token}`,
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    },

    consultEdit () {


    }

  }
}
</script>

<style scoped>
.icon-save {
  margin-right: 5px !important;
  font-size: 12px !important;
  top: 3px;
  position: relative;
}
</style>
