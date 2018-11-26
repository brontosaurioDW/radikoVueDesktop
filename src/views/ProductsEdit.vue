<template>
  <div class="productsEdit">

  	<ProductsEditFormPage />

  </div>
</template>

<script>
// @ is an alias to /src
import ProductsEditFormPage from '../components/ProductsEditFormPage.vue'

export default {
  name: 'productsEdit',
  components: {
    ProductsEditFormPage
  }
}
</script>