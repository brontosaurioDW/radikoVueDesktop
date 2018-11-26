<template>
  <div class="products">

  	<ProductDetailPage />

  </div>
</template>

<script>
// @ is an alias to /src
import ProductDetailPage from '../components/ProductDetailPage.vue'

export default {
  name: 'product',
  components: {
    ProductDetailPage
  }
}
</script>