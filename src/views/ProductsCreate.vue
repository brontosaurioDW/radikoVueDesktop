<template>
  <div class="productsCreate">

  	<ProductsCreateFormPage />

  </div>
</template>

<script>

import ProductsCreateFormPage from '../components/ProductsCreateFormPage.vue'

export default {
  name: 'productsCreate',
  components: {
    ProductsCreateFormPage
  },
  	created () {
		this.$store.commit('SET_LAYOUT', 'principal-layout')
	}
}
</script>