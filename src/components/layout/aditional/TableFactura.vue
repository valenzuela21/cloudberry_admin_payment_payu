<template>
  <b-table
    :data="isEmpty ? [] : data"
    :bordered="isBordered"
    :striped="isStriped"
    :narrowed="isNarrowed"
    :hoverable="isHoverable"
    :loading="isLoading"
    :focusable="isFocusable"
    :mobile-cards="hasMobileCards">

    <b-table-column field="month" label="Meses" width="40" numeric v-slot="props">
      {{ props.row.id }}
    </b-table-column>

    <b-table-column field="service" label="Servicio" v-slot="props">
        {{ props.row.first_name }}
    </b-table-column>
    <b-table-column field="service" label="Total" v-slot="props">
      <strong> {{ props.row.total}}</strong>
    </b-table-column>

  </b-table>
</template>

<script>
export default {
  name: 'TableFactura',
  data () {
    const data = [
      {'id': 1, 'first_name': 'TiendaVirtual-J9Jydh0Ahfl3 Plan Service 1', 'total': '$20.000'}
    ]

    return {
      data,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    }
  }
}
</script>

<style scoped>

</style>
