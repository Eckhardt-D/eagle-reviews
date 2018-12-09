export default function({ store, redirect, route }) {
    store.state.currentUser != null && route.name == '/test' ? redirect('/admin') : ''
    store.state.currentUser == null && isAdminRoute(route) ? redirect('/test') : ''
    console.log(store.state)
  }
  
  function isAdminRoute(route) {
    console.log(route)
    if (route.path === '/') {
      return true
    }
  }
  