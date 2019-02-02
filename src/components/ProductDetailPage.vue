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
						<tr v-if="producto.marca">
							<th>Marca</th>
							<td>{{ producto.marca }}</td>
						</tr>
						<tr v-if="producto.precio">
							<th>Precio</th>
							<td>$ {{ producto.precio }}</td>
						</tr>
						<tr v-if="producto.publicado">
							<th>Publicado</th>
							<td>{{ publicado }}</td>
						</tr>
						<tr v-if="producto.categoria">
							<th>Categoria</th>
							<td>{{ producto.categoria }}</td>
						</tr>
						<tr v-if="producto.stock" class="stock-ok"> <!-- class="stock-no" si no hay stock -->
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
						path: require("../assets/img/productos/" + this.producto.foto)
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

			this.$store.dispatch('loadSingleProduct', id)
			.then(data => {
				this.producto = this.$store.state.producto;
			});

			// fetch('http://localhost/radikoVueDesktop/api/producto.php?id=' + id)
			// .then(response => response.json())
			// .then(data => {
			// 	this.producto = data;
			// });
		}
	}

</script>