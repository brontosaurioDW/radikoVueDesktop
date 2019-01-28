<template>
    <section class="products">
        <ProductsPage />
    </section>
</template>

<script>

import ProductsPage from '../components/ProductsPage.vue'

export default {
    name: 'products',
    components: {
        ProductsPage
    },
	created () {
		this.$store.commit('SET_LAYOUT', 'principal-layout')
	}
}
</script>