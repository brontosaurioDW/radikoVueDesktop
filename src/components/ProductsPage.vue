<template>
	<div class="simple-page">
		<h2>Listado de productos de tu huerta</h2>
		<p>Acá podés visualizar todos tus productos, editarlos o eliminarlos</p>

		<router-link to="/products/create" class="btn btn-primary btn-lg cta-abs">
			+ Agregar producto
		</router-link>

		<div class="simple-box">
			<ProductsTable />
		</div>
	</div>
</template>

<script>

	import ProductsTable from './ProductsTable.vue'
	
	export default {
		name: 'products',

		components: {
			ProductsTable
		} 
	}

</script>
