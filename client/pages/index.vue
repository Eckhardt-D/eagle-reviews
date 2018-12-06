<template>
  <div>
    <TheNav/>
    <div class="container mt-3">
      <the-category-selector @selectedCategory="logEvent($event)" class="category-selector mb-3"/>
      <div style="min-height: 80px;" class="row category-section px-3 bg-light border align-items-center">
        <h3 class="text-uppercase mb-1">Top 10 Places</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-6 mt-3" v-for="(review, index) in reviews" :key="index">
          <div class="card mx-auto" style="width: 80%;">
            <img class="card-img-top" 
            :src="review.images[0]">
            <div class="card-body">
              <h4><span class="text-success">#{{index + 1}}</span> {{review.place}}</h4>
              <h5 class="card-title"><i v-for="(stars, i) in review.stars" :key="i" class="fa fa-star text-warning"></i></h5>
              <p class="card-text">{{review.content}}</p>
              <a href="#" class="btn btn-outline-primary">Check Reviews</a>
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
        <h3 class="text-uppercase mb-1">Places around Namibia</h3>
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
  mounted() {
    this.$store.dispatch('getReviews')
    this.$store.dispatch('getPlaces')
  },
  computed: {
    ...mapGetters([
      'reviews',
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
