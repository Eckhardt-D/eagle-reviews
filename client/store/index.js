import Vuex from 'vuex'
import {auth, googleAuth} from '@/plugins/firebase'

const state = {
  places: '',
  currentUser: {}
}

const getters = {
  places: state => state.places,
  currentUser: state => state.currentUser
}

const mutations = {
  SET_PLACES: (state, payload) => {
    state.places = payload
  },
  SET_USER: (state, payload) => {
    state.currentUser = payload
  }
}

const actions = {
  getPlaces({commit}) {
    this.$axios.$get('http://localhost:5000/places')
    .then(data => {
      commit('SET_PLACES', data)
    })
    .catch(err => console.log(err))
  },
  authenticateUser({commit}) {
    if(!auth.currentUser) {
      auth.signInWithRedirect(googleAuth).then(function(result) {
        var user = result.user;
        commit('SET_USER', user);
      }).catch(function(error) {
        commit('SET_USER', {});
      });
    }
  }
}

const store = () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store