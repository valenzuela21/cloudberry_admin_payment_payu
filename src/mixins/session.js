export default {
  created () {
    const token = JSON.parse(this.$localStorage.get('token_cloudberry'))
    if (!token) {
      this.$router.push('/')
    }
  }
}
