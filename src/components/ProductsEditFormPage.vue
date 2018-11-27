<template>

	<div class="simple-page">
		<h2>Editar producto</h2>
		<p>Completá los siguientes datos para editar el producto</p>
		
		<form @submit.prevent="editar(producto)" class="form">
			<div class="form-row">
				<div class="wrap-input">
					<label class="label-input">Nombre del producto <span class="red bold">*</span></label>
					<input 
					class="input" 
					type="text" 
					name="nombre-producto" 
					placeholder="Escribe el nombre del producto"
					v-model="producto.producto">
				</div>

				<div class="wrap-input">
					<label class="label-input">Precio <span class="red bold">*</span></label>
					<div class="precio-input">
						<span class="price">$</span>
						<input 
						class="input" 
						type="text" 
						name="precio-producto" 
						placeholder="¿Cuánto sale?"
						v-model="producto.precio">
					</div>
				</div>

				<div class="wrap-input">
					<label class="label-input" for="categorias">Categoría <span class="red bold">*</span></label>
					<div>
						<select v-model="producto.id_categoria" class="select" id="categorias">
							<option 
							v-for="categoria in categorias" 
							:value="categoria.id_categoria"">
							
							{{categoria.categoria}}
						</option>
					</select>
				</div>
			</div>

			<div class="wrap-input">
				<label class="label-input">Marca <span class="red bold">*</span></label>
				<input 
				class="input" 
				type="text" 
				name="marca-producto" 
				placeholder="Agrega la marca"
				v-model="producto.marca">
			</div>

			<div class="flex">
				<div class="wrap-input half-input">
					<label class="label-input">Stock <span class="red bold">*</span></label>
					<input 
					class="input" 
					type="text" 
					name="stock-producto" 
					placeholder="¿Cuántos quedan?"
					v-model="producto.stock">
				</div>

				<div class="wrap-input half-input">
					<label class="label-input" for="unidad">Unidad de medida <span class="red bold">*</span></label>
					<div>
						<select v-model="producto.id_unidad" class="select" id="unidades">
							<option v-for="unidad in unidades" :value="unidad.id_unidad_medida">{{unidad.unidad_de_medida}}</option>
						</select>
					</div>
				</div>							
			</div>

			<div class="wrap-input">
				<label class="label-input">Descripción <span class="red bold">*</span></label>
				<textarea 
				class="textarea" 
				name="nombre-producto" 
				cols="15"
				rows="5" 
				placeholder="Agrega una descripción del producto"
				v-model="producto.descripcion"></textarea>
			</div>

			<div class="text-right">
				<button class="btn btn-primary btn-lg">Editar</button>
			</div>
		</div>
	</form>		
</div>


</template>

<script>
	
	export default {
		data() {
			return {
				producto: {
					producto: '',
					descripcion: '',
					marca: '',
					precio: '',
					stock: '',
					categoria: '',
					estado: '',
					unidad: ''
				},
				statusMsg: null,
				status: null
			}
		},

		computed: {
			unidades() {
				return this.$store.state.unidades
			},
			categorias() {
				return this.$store.state.categorias
			}
		},

		methods: {
			editar(producto) {
				fetch('http://localhost/radikoVueDesktop/api/editar-producto.php', {
					method: 'POST',
					body: JSON.stringify(producto)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						this.status = 1;
						this.statusMsg = "producto guardado";
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
				console.log(data)
			});
	
			this.$store.dispatch('loadCategorias')
			this.$store.dispatch('loadUnidades')

		},

	}
</script>

<style>
	.precio-input {
		position: relative;
	}
	
	.precio-input span.price {
		font-size: 18px;
		position: absolute;
		left: 0;
		top: 19px;
	}

	.precio-input input {
		text-indent: 25px;
	}
</style>