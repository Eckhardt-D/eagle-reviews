import { auth } from '@/services/fireInit'

export default {
  mounted() {
    const router    = this.$router
    const routePath = this.$route.path
    const store     = this.$store

    let user = store.state.currentUser || auth.currentUser
    // if(!user && routePath === '/admin') return router.go('/test')
    // if(user) return
    console.log(user)
  }
}