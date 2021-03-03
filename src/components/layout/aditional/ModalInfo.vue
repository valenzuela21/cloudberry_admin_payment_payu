<template>
  <div v-if="status === false">
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

      <div class="buttons">
        <b-button type="is-primary"
                  native-type="submit"
                  expanded >
          Guardar Cambios
        </b-button>
      </div>
    </form>
  </div>
  <div v-else>
    <img :src="'./static/save.png'" alt="save" class="image-save" />
    <p class="txt-save">Se ha guardado correctamente los cambios.</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalInfo',
  props: ['formDataId'],
  data () {
    return {
      errors: [],
      status: false,
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
      if (name_user && email && cedula) {
        let data = { 'name': name_user, 'email': email, 'cedula': cedula }

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
            this.status = true
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
.image-save{
  width: 150px;
  margin: auto;
  display: block;
}
.txt-save{
  text-align: center;
  color: #7e7e7e;
  margin-top:30px
}
</style>
