export default {
  created () {
    const token = JSON.parse(this.$localStorage.get('token_cloudberry'))
    if (!token) {
      this.$localStorage.remove('token_cloudberry')
      this.$router.push('/')
    }
  }
}
