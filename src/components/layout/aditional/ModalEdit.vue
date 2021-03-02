<template>
  <div>
  <b-modal :width="640" v-model="modalActive">
    <div class="card">
      <div class="card-content">
        <b-field label="Nombre Completo"
                 type="is-danger"
                 message="Ingresa el nombre usuario">
          <b-input maxlength="30"
                   :value="formModalData[3]">
          </b-input>
        </b-field>
        <b-field label="Correo Electrónico"
                 type="is-danger"
                 message="Ingresa el correo electrónico">
          <b-input type="email"
                   :value="formModalData[2]">
          </b-input>
        </b-field>
        <b-field label="Contraseña">
          <b-input type="password"
                   value=""
                   password-reveal>
          </b-input>
        </b-field>
        <div class="block mt-5">
          <b-radio v-model="formModalData[4]"
                   name="permision"
                   native-value="1">
            Administrador
          </b-radio>
          <b-radio v-model="formModalData[4]"
                   name="permision"
                   native-value="0">
            Usuario
          </b-radio>
        </div>
        <div class="columns is-vcentered">
          <div class="column is-8">
          </div>
          <div class="column">
            <p class="bd-notification is-primary">
              <b-button type="is-primary">
                <b-icon
                  icon="content-save"
                  class="icon-save">
                </b-icon>
                Guardar Cambios
              </b-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
    <b-button type="is-primary"
              icon-left="lead-pencil"
              @click="modalActive = true" />
  </div>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: ['formModalData'],
  data () {
    return {
      modalActive: false
    }
  }

}
</script>

<style scoped>
.icon-save{
  margin-right: 5px !important;
  font-size: 12px !important;
  top: 3px;
  position: relative;
}
</style>
