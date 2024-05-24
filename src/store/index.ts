import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: {
    localHost: 'http://127.0.0.1:8000',
    isAdmin: false,
    isUserRegisterd: false
  },
  getters: {
  },
  mutations: {
    setNewUsers (state, user) {
      state.isAdmin = user
    },

    setIsUserRegisterd (state, params) {
      state.isUserRegisterd = params
    }
  },
  actions: {
    setAdmin ({ commit }, user) {
      commit('setNewUsers', user)
    },

    setIsUserRegisterd ({ commit }, params) {
      commit('setIsUserRegisterd', params)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
