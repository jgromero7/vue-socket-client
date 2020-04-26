import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex);

import VueSocketIO from 'vue-socket.io'

import counterModule from '@/modules/counter'

const store = new Vuex.Store({
  state: {
    io: {}
  },
  mutations: {
    setSocket: (state, socket) => {
      state.io = socket;
      console.log('socket connected');
    }
  },
  modules: { counterModule }
})

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:5000',
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    store.commit('setSocket', this.$socket);
  },
  render: h => h(App)
})
