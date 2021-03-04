<template>
    <div>
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h3 class="subtitle"> <b-icon
                icon="account">
              </b-icon> Información Cuenta</h3>
              <b-field>
                <b-tag>{{txtpermision}}</b-tag>
              </b-field>
              <p class="is-size-7"><strong>Nombre Usuario:</strong> {{userInfo.name_user}}</p>
              <p class="is-size-7"><strong>Correo electónico:</strong> {{userInfo.email}}</p>
              <p class="is-size-7"><strong>Usuario Creado:</strong> {{userInfo.created_at}}</p>
              <p class="is-size-7"><strong>Usuario Actualizado:</strong> {{userInfo.updated_at}}</p>
            </div>
          </div>

        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <section>
                <h3 class="subtitle"><b-icon
                  icon="lock">
                </b-icon> Contraseña </h3>
                <b-field label="Email"
                         :type="this.errors.type_password"
                         :message="this.errors.password">
                  <b-input placeholder="Ingresa la nueva contraseña"
                           v-model = "password"
                           type="password"
                           icon="lock"
                           password-reveal>
                  </b-input>
                </b-field>
                <b-button type="is-primary" class="m-2" @click="updateAccount" >Cambiar Contraseña</b-button>
              </section>
            </div>
            <div class="card-content">
              <section>
                <h3 class="subtitle"><b-icon
                  icon="information">
                </b-icon>Actualizar Cuenta</h3>
                <p class="is-size-7">Nota: Actualiza tus datos personales, lo cual es muy importante para darte el mejor servicio.</p>
                <b-button type="is-primary" class="m-2" @click="isModalActive = true" >Actualizar Información</b-button>
              </section>
            </div>
          </div>
        </div>
    </div>
      <b-modal v-model="isModalActive" :width="540" scroll="keep">
        <div class="card">
          <div class="card-content">
          <ModalInfo :formData="this.dataFormEdit" />
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ModalInfo from './ModalInfo'
import axios from 'axios'
export default {
  name: 'Setting',
  data () {
    return {
      isModalActive: false,
      password: null,
      errors: [],
      token: null,
      dataFormEdit: []
    }
  },
  components: {
    ModalInfo
  },
  created () {
    let token = this.$localStorage.get('token_cloudberry')
    this.token = JSON.parse(token)
    this.consultEdit()
  },
  methods: {
    consultEdit () {
      let config = {
        method: 'get',
        url: `http://comunicacionescloudberry.com/payment/Api/users/${this.userInfo.id}`,
        headers: {
          'Authorization': `${this.token.token}`
        },
        data: ''
      }

      axios(config).then((response) => {
        this.dataFormEdit = response.data[0]
      })
        .catch((error) => console.log(error))
    },
    updateAccount () {
      this.errors = []

      if (!this.password) {
        this.errors.password = 'Ingresa la contraseña nueva contraseña'
        this.errors.type_password = 'is-danger'
      }

      if (this.password) {
        let data = {
          'id_user': this.userInfo.id_user,
          'user_name': this.userInfo.name_user,
          'email': this.userInfo.email,
          'cedula': this.userInfo.cedula,
          'contrasena': this.password,
          'option': 1
        }

        var config = {
          method: 'put',
          url: 'http://comunicacionescloudberry.com/payment/Api/password_update',
          headers: {
            'Authorization': `${this.token.token}`
          },
          data: data
        }
        axios(config)
          .then((response) => {
            this.errors.password = 'Se ha cambiado correctamente la contraseña'
            this.errors.type_password = 'is-success'
            setTimeout(() => {
              this.$localStorage.remove('token_cloudberry')
              this.$router.push('/')
            }, 2000)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    txtpermision: function () {
      let permission
      if (this.userInfo.permision === '1') {
        permission = 'Administrador'
      } else {
        permission = 'Usuario'
      }
      return permission
    }
  }

}
</script>

<style scoped>
.password-btn{
  float: right;
}
</style>
