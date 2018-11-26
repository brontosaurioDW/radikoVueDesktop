<template>
  <div class="products">

  	<ProductDetailPage />

  </div>
</template>

<script>
	
import ProductDetailPage from '../components/ProductDetailPage.vue'

export default {
  name: 'product',
  components: {
    ProductDetailPage
  }
}
</script>