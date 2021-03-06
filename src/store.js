import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: []
  },
  mutations: {
    INFO_USER (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async getInfoProfile ({commit}) {
      let token = localStorage.getItem('token_cloudberry')
      let _token = JSON.parse(token)
      const URL_PROFILE = `http://comunicacionescloudberry.com/payment/Api/users/${_token.id}`
      const datauser = await axios.get(URL_PROFILE, {headers: { 'Authorization': `${_token.token}` }})
      if (datauser.resp === false && datauser.status === 401) {
        localStorage.setItem('token_cloudberry', '')
      } else {
        commit('INFO_USER', datauser.data[0])
      }
    }
  }
})
