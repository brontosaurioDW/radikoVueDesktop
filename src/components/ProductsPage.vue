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
		
		<ul class="disclaimer">
			<ProductsTableDisclaimerRow 
			v-for="(unidad, index) in unidades"
			:unidad="unidad"
			:key="unidad.id_unidad_medida"
			:i="index"/> 
		</ul>
	</div>
</template>

<script>

	import ProductsTable from './ProductsTable.vue';
	import ProductsTableDisclaimerRow from './ProductsTableDisclaimerRow.vue';
	
	export default {
		name: 'products',
		components: {
			ProductsTable,
			ProductsTableDisclaimerRow
		},
		computed: {
			unidades() {
				return this.$store.state.unidades;
			}
		},
		mounted() {
			this.$store.dispatch('loadUnidades')
		}		
	}

</script>
