<template>
          <form @submit.prevent="checkEditUser">
            <b-field label="Nombre Completo"
                     type="is-danger"
                     message="Ingresa el nombre usuario">
              <b-input v-model="dataFormEdit.name_user">
              </b-input>
            </b-field>
            <b-field label="Correo Electrónico"
                     type="is-danger"
                     message="Ingresa el correo electrónico">
              <b-input type="email"
                       v-model="dataFormEdit.email">
              </b-input>
            </b-field>
            <b-field label="Contraseña">
              <b-input type="password"
                       v-model="password"
                       password-reveal>
              </b-input>
            </b-field>
            <div class="block mt-5">
              <b-radio v-model="dataFormEdit.permision"
                       name="permision"
                       native-value="1">
                Administrador
              </b-radio>
              <b-radio v-model="dataFormEdit.permision"
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalEdit',
  props: ['formDataId'],
  data () {
    return {
      id: this.formDataId,
      dataFormEdit: [],
      password: ''
    }
  },

  mounted () {
    this.consultEdit()
  },

  methods: {
    checkEditUser () {
      let data = {'name': this.name, 'contrasena': this.contrasena, 'email': this.email, 'permision': this.permission}

      let token = this.$localStorage.get('token_cloudberry')
      let _token = JSON.parse(token)

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
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    consultEdit () {
      let token = this.$localStorage.get('token_cloudberry')
      let _token = JSON.parse(token)

      let config = {
        method: 'get',
        url: `http://comunicacionescloudberry.com/payment/Api/users/${this.id}`,
        headers: {
          'Authorization': `${_token.token}`
        },
        data: ''
      }

      axios(config).then((response) => {
        console.log(response)
        this.dataFormEdit = response.data[0]
      })
        .catch((error) => console.log(error))
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
