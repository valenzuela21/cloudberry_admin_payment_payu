<template>
    <div>
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h3 class="subtitle"> <b-icon
                icon="account">
              </b-icon> Información Cuenta</h3>
              <p>Nombre Usuario: {{userInfo.name_user}}</p>
              <p>Correo electónico: {{userInfo.email}}</p>
              <p>Usuario Creado: {{userInfo.created_at}}</p>
              <p>Uusario Actualizado: {{userInfo.updated_at}}</p>
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
                <b-field>
                  <b-input placeholder="Ingresa la nueva contraseña"
                           type="password"
                           icon="lock" >
                  </b-input>
                </b-field>
                <b-button type="is-primary" class="m-2" >Cambiar Contraseña</b-button>
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
            <h2 class="" ><b-icon
              icon="information">
            </b-icon> Información Personal</h2>
          <ModalInfo :formDataId="userInfo.id" />
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ModalInfo from './ModalInfo'
export default {
  name: 'Setting',
  data () {
    return {
      isModalActive: false
    }
  },
  components: {
    ModalInfo
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.password-btn{
  float: right;
}
</style>
