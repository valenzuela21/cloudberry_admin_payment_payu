<template>
          <form @submit.prevent="checkEditUser">
            <b-field label="Nombre Completo"
                     :type="errors.name_type"
                     :message="errors.name">
              <b-input v-model="dataFormEdit.name_user"
                       id="name"
                       name="name">
              </b-input>
            </b-field>
            <b-field label="Correo Electrónico"
                     :type="errors.email_type"
                     :message="errors.email">
              <b-input type="email"
                       v-model="dataFormEdit.email"
                       id="email"
                       name="email">
              </b-input>
            </b-field>
            <b-field label="Cedula"
                     :type="errors.cedula_type"
                     :message="errors.cedula">
              <b-input v-model="dataFormEdit.cedula"
                       id="cedula"
                       name="cedula">
              </b-input>
            </b-field>
            <b-field label="Contraseña"
                     :type="errors.password_type"
                     :message="errors.password">
              <b-input type="password"
                       v-model="password"
                       name="password"
                       id="password"
                       password-reveal>
              </b-input>
            </b-field>
            <div class="block mt-5">
              <b-radio v-model="dataFormEdit.permision"
                       name="permision"
                       id="permsion"
                       native-value="1">
                Administrador
              </b-radio>
              <b-radio v-model="dataFormEdit.permision"
                       id="permision"
                       name="permision"
                       native-value="0">
                Usuario
              </b-radio>
            </div>
                <div class="buttons">
                  <b-button type="is-primary"
                            native-type="submit"
                            expanded >
                  Guardar Cambios
                  </b-button>
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
      errors: [],
      id: this.formDataId,
      dataFormEdit: [],
      password: null
    }
  },

  created () {
    this.consultEdit()
  },

  methods: {
    checkEditUser () {
      this.errors = []
      // eslint-disable-next-line camelcase
      const {name_user, email, permision, cedula} = this.dataFormEdit
      // eslint-disable-next-line camelcase
      if (!name_user) {
        this.errors.name = 'Error: Ingresa el nombre completo'
        this.errors.name_type = 'is-danger'
      }
      if (!email) {
        this.errors.email = 'Error: Ingresa el correo electrónico'
        this.errors.email_type = 'is-danger'
      }
      if (!this.password) {
        this.errors.cedula = 'Error: Ingresa el numero de identificación'
        this.errors.cedula_type = 'is-danger'
      }
      if (!this.password) {
        this.errors.password = 'Error: Ingresa la contraseña'
        this.errors.password_type = 'is-danger'
      }
      if (!permision) {
        this.errors.permision = 'Error: Ingresa el permiso'
        this.errors.permision_type = 'is-danger'
      }
      // eslint-disable-next-line camelcase
      if (name_user && email && this.password && permision && cedula) {
        let data = {'name': name_user, 'contrasena': this.password, 'email': email, 'permision': permision, 'cedula': cedula}

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
            console.log('Cambio de usuario exitoso!')
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
