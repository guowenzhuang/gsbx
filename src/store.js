import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      name: sessionStorage.getItem('name'),
      headUrl: sessionStorage.getItem('headUrl')
    }
  },
  mutations: {
    setHead (state, headUrl) {
      state.userinfo.headUrl = headUrl
      sessionStorage.setItem('headUrl', headUrl)
    },
    setName (state, name) {
      state.userinfo.name = name
      sessionStorage.setItem('name', name)
    }
  },
  actions: {}
})
