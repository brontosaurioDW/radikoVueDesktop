<template>
	
	<div class="simple-page">

		<div class="simple-box box-a product">
			<div class="flex flex-top">
				<div class="product-left">
					<div class="product-photo">
						<!-- <img :src="imagen" alt=""> -->
						<!-- <img :src="'../assets/img/' + imagen" alt=""> -->
						<!-- <img alt="Vue logo" src="../assets/img/pera.jpeg"> -->
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
		</div>				
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
				if (this.producto.foto == null) {
					console.log('default image')
					return '../assets/img/imgdefault.jpeg' ;
				} else {
					console.log(this.producto.foto)
					return this.producto.foto;
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
						router.push({ path: '/productos', message: this.statusMsg });
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