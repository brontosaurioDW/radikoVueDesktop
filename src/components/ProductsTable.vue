<template>		
	<table class="table-b products-table">
		<thead>
			<tr>
				<th>Producto</th>
				<th>Marca</th>
				<th>Precio</th>
				<th>Stock</th>
				<th>Estado</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<ProductsTableRow 
			v-for="(producto, index) in productos"
			:producto="producto"
			/>
		</tbody>			
	</table>
</template>

<script>

	import ProductsTableRow from './ProductsTableRow.vue'

	export default {
		name: 'ProductsTable',

		components: {
			ProductsTableRow
		},

		computed: {
			productos() {
				return this.$store.state.productos;
			}
		},

		mounted() {
			this.$store.dispatch('loadProducts')
		}
	}
	
</script>