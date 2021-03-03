<template>
  <div>
    <Navbar/>
    <div class="section">
        <Setting />
    </div>

  </div>
</template>

<script>
import Navbar from './layout/Navbar'
import Setting from './layout/aditional/Setting'
import session from '../mixins/session'
export default {
  name: 'Config',
  components: {
    Navbar,
    Setting
  },
  mixins: [session]
}
</script>

<style scoped>

</style>
