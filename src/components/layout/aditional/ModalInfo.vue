<template>
  <div v-if="status === false">
    <h2 class="mb-3" ><b-icon
      icon="file-document-edit">
    </b-icon> Información Personal</h2>
    <form @submit.prevent="checkEditUser">
      <b-field label="Nombre Completo"
               :type="errors.name_type"
               :message="errors.name">
        <b-input v-model="data.name_user"
                 id="name"
                 name="name">
        </b-input>
      </b-field>
      <b-field label="Correo Electrónico"
               :type="errors.email_type"
               :message="errors.email">
        <b-input type="email"
                 v-model="data.email"
                 id="email"
                 name="email">
        </b-input>
      </b-field>
      <b-field label="Cedula"
               :type="errors.cedula_type"
               :message="errors.cedula">
        <b-input v-model="data.cedula"
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
    <p class="txt-save">Cerrando Session, ¡Ingresa Nuevamente!.</p>
    <p class="txt-save">Se ha guardado correctamente los cambios.</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalInfo',
  props: ['formData'],
  data () {
    return {
      errors: [],
      status: false,
      data: this.formData,
      dataFormEdit: []
    }
  },

  methods: {
    checkEditUser () {
      this.errors = []
      // eslint-disable-next-line camelcase
      const {id_user, name_user, email, cedula} = this.formData
      // eslint-disable-next-line camelcase
      if (!name_user) {
        this.errors.name = 'Error: Ingresa el nombre completo'
        this.errors.name_type = 'is-danger'
      }
      if (!email) {
        this.errors.email = 'Error: Ingresa el correo electrónico'
        this.errors.email_type = 'is-danger'
      }
      if (!cedula) {
        this.errors.cedula = 'Error: Ingresa el numero de identificación'
        this.errors.cedula_type = 'is-danger'
      }
      // eslint-disable-next-line camelcase
      if (name_user && email && cedula) {
        let data = {'id_user': id_user, 'user_name': name_user, 'email': email, 'cedula': cedula, 'option': 2}

        let token = this.$localStorage.get('token_cloudberry')
        let _token = JSON.parse(token)

        let config = {
          method: 'put',
          url: 'http://comunicacionescloudberry.com/payment/Api/password_update',
          headers: {
            'Authorization': `${_token.token}`
          },
          data: data
        }

        axios(config)
          .then((response) => {
            this.status = true
            setTimeout(() => {
              this.$localStorage.remove('token_cloudberry')
              this.$router.push('/')
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
