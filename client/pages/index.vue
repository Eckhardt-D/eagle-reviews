<template>
  <section class="container">
    <div>
      <logo/>
      <div class="container">
        <div class="row">
          <div class="col-6 mx-auto">
            <i style="font-size: 25px;" class="fa fa-address-book"></i>
            <h1>BOOTSTRAP TEST</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
