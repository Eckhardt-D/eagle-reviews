import {auth} from '@/services/fireInit'

export default ({store, redirect, route}) => {
  store.watch(() => store.getters.currentUser, user => {
    if(user && user !== null) {
      console.log(user)
      return
    } else {
      recursiveUserSet();
    }
  })

  let recursiveUserSet = () => {
    let user = store.state.currentUser || auth.currentUser
      try {
        if(!user) {
          recursiveUserSet()
        } else {
          console.log(user)
          store.commit('SET_USER', user);
        }
      } catch(err) {
      console.log(err)
    }
  }
}