import Vuex from 'vuex'
import {auth, googleAuth} from '@/services/fireInit'

const state = {
  places: '',
  currentUser: null
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
  authenticateUser({commit, dispatch}) {
    if(!auth.currentUser) {
      auth.signInWithRedirect(googleAuth).then(function(result) {
        var user = result.user;
        commit('SET_USER', user);
        this.$router.push('/');
      }).catch(function(error) {
        commit('SET_USER', {});
      });
    } else {
      console.log(auth.currentUser)
      dispatch('saveUserToDb', auth.currentUser)
    }
  },
  saveUserToDb(ctx, user) {
    return new Promise((resolve, reject) => {
      let userDetails = {
        googleId: user.uid,
        firstname: user.displayName,
        owns: [''],
        reviews: [{}],
        favourites: [{}],
        email: user.email,
        reported: false,
        profileImage: user.photoURL
      }

      this.$axios.$post('http://localhost:5000/users', userDetails)
      .then(res => console.log(res))
      .catch(e => console.log(e))
    })
  }
}

const store = () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store