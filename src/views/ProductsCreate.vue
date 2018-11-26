<template>
  <div class="productsCreate">

  	<ProductsCreateFormPage />

  </div>
</template>

<script>
// @ is an alias to /src
import ProductsCreateFormPage from '../components/ProductsCreateFormPage.vue'

export default {
  name: 'productsCreate',
  components: {
    ProductsCreateFormPage
  }
}
</script>