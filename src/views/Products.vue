<template>
  <div class="products">

  	<ProductsPage />

  </div>
</template>

<script>
// @ is an alias to /src
import ProductsPage from '../components/ProductsPage.vue'

export default {
  name: 'products',
  components: {
    ProductsPage
  }
}
</script>