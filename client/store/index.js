import Vuex from 'vuex'

const state = {
  reviews: '',
  places: ''
}

const getters = {
  reviews: state => state.reviews,
  places: state => state.places
}

const mutations = {
  SET_REVIEWS: (state, payload) => {
    state.reviews = payload
  },
  SET_PLACES: (state, payload) => {
    state.places = payload
  }
}

const actions = {
  getReviews({commit}) {
    this.$axios.$get('http://localhost:5000/reviews')
    .then(data => {
      commit('SET_REVIEWS', data)
    })
    .catch(err => console.log(err))
  },
  getPlaces({commit}) {
    this.$axios.$get('http://localhost:5000/places')
    .then(data => {
      console.log(data)
      commit('SET_PLACES', data)
    })
    .catch(err => console.log(err))
  }
}

const store = () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store