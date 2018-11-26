<template>	
	<table class="table pedidos-table table-a">
		<thead>
			<tr>
				<th>N°</th>
				<th>Cliente</th>					
				<th class="text-center">Precio</th>
				<th class="text-center">Día de entrega</th>
				<th class="text-center">Estado</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<PedidosTableRow 
			v-for="pedido in pedidos"
			:pedido="pedido"

			/>
		</tbody>
	</table>
</template>

<script>

	import PedidosTableRow from './HomePedidosTableRow.vue'

	export default {
		name: 'PedidosTable',

		components: {
			PedidosTableRow
		},

		computed: {
			pedidos() {
				return this.$store.state.pedidos;
			}
		},

		mounted() {
			this.$store.dispatch('loadPedidos');
		}
	}

</script>