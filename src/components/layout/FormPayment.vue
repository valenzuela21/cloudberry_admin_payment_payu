<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title-modal">
          <b-icon
            icon="shopping"
            size="is-small">
          </b-icon>
          Nuevo Pago
        </h1>
        <p class="is-size-7">
          Servicio o plan: Plan Siembra
        </p>

      </div>
      <div class="column">
        <p class="precio-modal">Precio: $30000</p>
      </div>
    </div>
    <b-field label="Nombre del titular">
      <b-input v-model="name"
               placeholder="Ingresa el nombre completo"
               type="is-success"
               message="Ingresa el nombre completo"
      ></b-input>
    </b-field>
    <b-field label="Cedula o Identificación">
      <b-input v-model="cedula"
               placeholder="Ingresa el número de identificación"
               type="is-success"
               message="Ingresa el nombre completo"
      ></b-input>
    </b-field>
    <b-field label="Correo electrónico"
             type="is-success"
             message="El correo es invalido">
      <b-input type="email"
               placeholder="Ingresa correo del pagante">
      </b-input>
    </b-field>
    <b-field label="Número telefóncio">
      <b-input v-model="phone"
               placeholder="Ingresa el número mobil del pagante"
      ></b-input>
    </b-field>
    <div class="buttons">
      <b-button type="is-primary" expanded>Pagar Ahora</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormPayment'
}
</script>

<style scoped>
.precio-modal {
  float: right;
  font-size: 20px;
  background: #d21139;
  padding: 5px 15px;
  color: #fff;
  border-radius: 4px;
}

.title-modal {
  font-size: 22px;
  color: #777;
}
</style>
