import Vuex from 'vuex'

const state = {
  reviews: ''
}

const getters = {
  reviews: state => state.reviews
}

const mutations = {
  SET_REVIEWS: (state, payload) => {
    state.reviews = payload
  }
}

const actions = {
  getReviews({commit}) {
    this.$axios.$get('http://localhost:5000/reviews')
    .then(data => {
      commit('SET_REVIEWS', data)
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