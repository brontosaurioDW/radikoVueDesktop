<template>

	<tr>
		<td>{{ producto.producto }}</td>
		<td>{{ marca }}</td>
		<td>$ {{ producto.precio }}</td>
		<td>{{ producto.stock }} {{ producto.unidad_de_medida }}</td>
		<td>{{ estado }}</td>
		<td>
			<router-link 
				:to="'/product/' + producto.id_producto" 
				class="btn btn-primary">Ver</router-link>
			<router-link 
				:to="'/products/edit/' + producto.id_producto" 
				class="btn btn-terciary">Editar</router-link>
			<a 
				class="btn btn-secondary btn-sm" 
				v-confirm="{ok: dialog => eliminar(producto), message: '¿Seguro que querés eliminar este producto?'}">Eliminar</a>
		</td>
	</tr>

</template>

<script>
	
	export default {

		name: 'ProductsTableRow',

		computed: {
			estado() {
				if (this.producto.activo == "1") {
					return 'Publicado';
				} else {
					return 'No publicado';
				}
			},
			marca() {
				if(this.producto.marca == null) {
					return '-';
				}
				return this.producto.marca;
			}
		},

		props: {
			producto: Object
		},

		methods: {
			eliminar(producto) {
				fetch('http://localhost/radikoVueDesktop/api/eliminar-producto.php', {
					method: 'POST',
					body: JSON.stringify(producto)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						this.status = 1;
						this.statusMsg = "producto eliminado";
						this.$router.go({ path: '/productos' });
					} else {
						this.status = 0;
						this.statusMsg = "Error - Algo salió mal"
					}
				});
			}
		}
	}
</script>