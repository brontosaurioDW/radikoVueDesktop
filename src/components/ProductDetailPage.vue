<template>
	
	<div class="simple-page">
		<article class="simple-box box-a product">
			<div class="flex flex-top">
				<div class="product-left">
					
					<router-link to="/products" class="btn btn-primary"> Volver </router-link>

					<div class="product-photo">
						<figure>
							<img :src="imagen.path" :alt="producto.producto">
							<figcaption class="sr-only">{{ producto.producto }}</figcaption>
						</figure>
					</div>
					<div class="product-info">
						<h2>{{producto.producto}}</h2>
						<p>
							{{ producto.descripcion }}
						</p>
					</div>
				</div>

				<div class="product-right">
					<h3>Info del producto</h3>
					<table class="table-c">
						<tr>
							<th>Marca</th>
							<td>{{ producto.marca }}</td>
						</tr>
						<tr>
							<th>Precio</th>
							<td>$ {{ producto.precio }}</td>
						</tr>
						<tr>
							<th>Publicado</th>
							<td>{{ publicado }}</td>
						</tr>
						<tr>
							<th>Categoria</th>
							<td>{{ producto.categoria }}</td>
						</tr>
						<tr class="stock-ok"> <!-- class="stock-no" si no hay stock -->
							<th>Stock</th>
							<td class="bold">{{ producto.stock }} {{ producto.unidad }}</td>
						</tr>								
					</table>
				</div>
			</div>
		</article>				
	</div>

</template>

<script>
	

	export default {

		data() {
			return {
				producto: {}
			};
		},

		computed: {
			publicado() {
				if (this.producto.activo == "1") {
					return 'Sí';
				} else {
					return 'No';
				}
			},
			imagen(){
				if (this.producto.foto != null) {
					return {
					    path: require("../assets/img/" + this.producto.foto)
					};
				} else {
					return {
					    path: require("../assets/img/imgdefault.jpeg")
					};
				}
			}
		},

		methods: {
			eliminar(producto) {
				fetch('api/eliminar-producto.php', {
					method: 'POST',
					body: JSON.stringify(producto)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						this.status = 1;
						this.statusMsg = "producto eliminado";
						this.$router.push({ path: '/products', message: this.statusMsg });
					} else {
						this.status = 0;
						this.statusMsg = "Error - Algo salió mal"
					}
				});
			}
		},

		mounted() {
			let id = this.$route.params.id;

			fetch('http://localhost/radikoVueDesktop/api/producto.php?id=' + id)
			.then(response => response.json())
			.then(data => {
				this.producto = data;
			});
		}
	}

</script>