<template>
	<div>

		<info-top></info-top>

		<div class="flex flex-top">
			<div class="col-8">

				<h2>Pedidos Pendientes</h2>

				<div class="simple-box box-a">

					<PedidosTable />

					<router-link to="/productos" class="basic">
						Ver todos
					</router-link>

				</div>
			</div>

			<div class="col-4">

				<h2>Últimos mensajes</h2>				

				<div class="simple-box box-a">

					<UltimosMensajesTable />

					<a href="#" class="basic">Ver todos</a>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import InfoTop from './HomePageInfoTop.vue';
	import UltimosMensajesTable from './HomeUltimosMensajesTable.vue';
	import PedidosTable from './HomePedidosTable.vue';

	export default {
		name: 'home',

		components: {
			InfoTop,
			UltimosMensajesTable,
			PedidosTable
		}
	}

</script>
