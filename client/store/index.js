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
    auth.signInWithRedirect(googleAuth)
    .then(result => {
      let user = result.user

      dispatch('getUserToken', user)
      .then(data => {
        commit('SET_USER', data.user)
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  },
  getUserToken(ctx, user) {
    return new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem('ERTOKEN'));

      if(typeof token === 'undefined' || token === null) {
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
        .then(res => {
          token = res.token

          localStorage.setItem('ERTOKEN', JSON.stringify(token))
          resolve(res)
        })
        .catch(e => reject(e))
      } else {
        resolve({user, token})
      }
    })
  },
  getRequestSecurity({dispatch}, [user, callback]) {
    let theUser = user ? user : auth.currentUser

    if(theUser) {
      dispatch('getUserToken', theUser)
      .then(data => {
        callback(data.token)
      })
      .catch(error => console.log(error));
    } else {
      this.$router.go('/test')
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