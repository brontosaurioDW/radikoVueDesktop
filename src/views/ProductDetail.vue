<template>
	<section class="products">
		<ProductDetailPage />
	</section>
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