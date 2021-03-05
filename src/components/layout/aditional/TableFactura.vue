<template>
  <b-table
    :data="isEmpty ? [] : data"
    :bordered="isBordered"
    :striped="isStriped"
    :narrowed="isNarrowed"
    :hoverable="isHoverable"
    :loading="isLoading"
    :focusable="isFocusable"
    :mobile-cards="hasMobileCards"
    ref="table">

    <b-table-column field="month" label="Meses" width="40" numeric v-slot="props">
      {{ props.row.id }}
    </b-table-column>

    <b-table-column field="service" label="Servicio" v-slot="props">
        {{ props.row.first_name }}
    </b-table-column>
    <b-table-column field="service" label="Total" v-slot="props">
      <strong style="font-size: 18px;"> {{ formatCurrency("es-CO", "COP", 0, props.row.total)}}</strong>
    </b-table-column>

  </b-table>
</template>

<script>
export default {
  name: 'TableFactura',
  props: ['dataTable'],
  data () {
    const data = []

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
  },
  methods: {
    c1method () {
      this.data = [
        {'id': this.dataTable[2], 'first_name': this.dataTable[1].service, 'total': this.dataTable[0]}
      ]
    },
    formatCurrency (locales, currency, fractionDigits, number) {
      let formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
      }).format(number)
      return formatted
    }
  }
}
</script>

<style scoped>

</style>
