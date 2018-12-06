<template>
  <div>
    <label class="mb-0" for="category-selector">Category</label>
    <select 
      @change="sendSelected" 
      v-model="selectedCategory" 
      name="category-selector" 
      id="category-selector">
      <option value="all">All Categories</option>
      <option value="accommodation">Accommodation</option>
      <option value="restaurant">Restaurant</option>
      <option value="shop">Shop</option>
      <option value="activity">Activity</option>
      <option value="bar">Bar/Club</option>
      <option value="service">Service Provider</option>
    </select>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedCategory: 'all'
  }),
  mounted() {
    this.$emit('selectedCategory', this.selectedCategory)
  },
  methods: {
    sendSelected() {
      this.$emit('selectedCategory', this.selectedCategory)
    }
  }
}
</script>
