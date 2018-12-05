<template>
  <div>
    <TheNav/>
    <div class="container mt-3">
      <div style="min-height: 80px;" class="row px-3 bg-light border align-items-center">
        <h3 class="text-uppercase mb-1">Top 10 Places</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-6">
          <div class="card mx-auto" style="width: 80%;">
            <img class="card-img-top" 
            src="https://image.ibb.co/djx0P7/11.jpg">
            <div class="card-body">
              <h4><span class="text-success">#10</span> Place name</h4>
              <h5 class="card-title"><i class="fa fa-star text-warning"></i></h5>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, corrupti!</p>
              <a href="#" class="btn btn-outline-primary">Check Reviews</a>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card mx-auto" style="width: 80%;">
            <img class="card-img-top" 
            src="https://image.ibb.co/djx0P7/11.jpg">
            <div class="card-body">
              <h4><span class="text-success">#9</span> Place name</h4>
              <h5 class="card-title"><i class="fa fa-star-half text-warning"></i></h5>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, corrupti!</p>
              <a href="#" class="btn btn-outline-primary">Check Reviews</a>
            </div>
          </div>
        </div>
      </div>
      <h6 class="mb-0 text-dark mt-3 mb-1">sponsored</h6>
      <div class="row bg-light p-2 border">
        <div class="media">
          <img style="height: 64px;" class="mr-3 align-self-center" src="https://image.ibb.co/djx0P7/11.jpg" alt="Generic placeholder image">
          <div class="media-body">
            <h5 class="mt-0">Place Name</h5>
            Visit us and win something or whatever.
          </div>
        </div>
      </div>
      <div style="min-height: 80px;" class="row px-3 bg-light border align-items-center mt-3">
        <h3 class="text-uppercase mb-1">Places around Namibia</h3>
      </div>
    </div>
  </div>
</template>

<script>
import TheNav from '~/components/TheNav'

export default {
  components: {
    TheNav
  }
}
</script>
