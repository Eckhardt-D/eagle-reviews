<template>
  <div>
    <TheNav/>
    <div class="container mt-3">
      <the-category-selector @selectedCategory="logEvent($event)" class="category-selector mb-3"/>
      <div style="min-height: 80px;" class="row category-section px-3 bg-light border align-items-center">
        <h3 class="text-uppercase mb-1">Top 10 Places</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-6 mt-3" v-for="(place, index) in places" :key="index">
          <div class="card mx-auto" style="width: 80%;">
            <img v-if="place.images" class="card-img-top" 
            :src="place.images[0]">
            <div class="card-body">
              <h4><span class="text-success">#{{index + 1}}</span> {{place.name}}</h4>
              <h5 class="card-title"><i v-if="place.reviews && place.reviews[1]" v-for="(stars, i) in place.reviews[1].stars" :key="i" class="fa fa-star text-warning"></i></h5>
              <p class="card-text">{{place.description}}</p>
              <a href="#" class="btn btn-outline-primary">Check This Place Out</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row sponsor-box bg-light p-2 border">
        <div class="media">
          <img style="height: 64px;" class="mr-3 align-self-center" src="https://image.ibb.co/djx0P7/11.jpg" alt="Generic placeholder image">
          <div class="media-body">
            <h5 class="mt-0">Place Name</h5>
            Visit us and win something or whatever.
          </div>
          <h6 class="sponsor-text">sponsored</h6>
        </div>
      </div>
      <div style="min-height: 80px;" class="row category-section px-3 bg-light border align-items-center mt-3">
        <h3 class="text-uppercase mb-1">Places around You</h3>
      </div>
      <div style="min-height: 80px;" class="row category-section px-3 bg-light border align-items-center mt-3">
        <h3 class="text-uppercase mb-1">Places in Namibia</h3>
      </div>
    </div>
  </div>
</template>

<script>
import TheNav from '~/components/TheNav'
import TheCategorySelector from '~/components/TheCategorySelector'
import {mapGetters} from 'vuex'

export default {
  components: {
    TheNav,
    TheCategorySelector
  },
  created() {
    this.$store.dispatch('getPlaces')
  },
  mounted() {
    // this.$store.dispatch('authenticateUser')
    console.log(this.places)
  },
  computed: {
    ...mapGetters([
      'places'
    ])
  },
  methods: {
    logEvent(payload) {
      console.log(payload)
    }
  }
}
</script>

<style lang="sass">

.sponsor-box, .category-section
  position: relative

.sponsor-text
  position: absolute
  right: 10px
  color: grey
  font-weight: lighter

</style>
