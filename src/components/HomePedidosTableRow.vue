<template>
	<tr>
		<td class="bold">#{{ pedido.id_pedido }}</td>
		<td>{{ pedido.nombre}} {{ pedido.apellido}}</td>
		<td class="text-center">$ {{ pedido.subtotal }}</td>
		<td class="text-center">{{ pedido.fecha_envio }}</td>
		<td class="text-center">{{ pedido.estado }}</td>
		<td class="text-right">
			<a href="#">
				<i class="icon icon-ch-right"></i>
			</a>
		</td>
	</tr>
</template>

<script>	
	export default {
		name: 'PedidosTableRow',
		
		props: {
			pedido: Object
		}
	}
</script>