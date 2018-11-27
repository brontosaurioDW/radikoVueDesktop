<template>
	
	<div class="simple-page">
		<h2>Nuevo producto</h2>
		<p>Completá los siguientes datos para cargar un nuevo producto de tu huerta</p>

		<div v-show="hasError" class="error">
			<p>{{ statusMsg }}</p>
		</div>

		<form @submit.prevent="grabar(producto)" class="form">
			<div class="form-row">
				<!-- <div class="wrap-input">
					<label class="label-input">Imagen</label>
					<input 
					class="input" 
					type="file" 
					name="foto" 
					placeholder="Sube una imagen"
					accept="image/*"
					@change="onFileSelected">
				</div> -->

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
						<select v-model="producto.categoria" class="select" id="categorias">
							<option value="" disabled selected>Seleccioná una categoría</option>
							<option v-for="categoria in categorias" :value="categoria.id_categoria">{{categoria.categoria}}</option>
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
							<select v-model="producto.unidad" class="select" id="unidades" name="unidad">
								<option value="" disabled selected>Seleccioná una unidad de medida</option>
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
					<button class="btn btn-primary btn-lg">Agregar</button>
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
					unidad: '',
					foto: ''
				},
				statusMsg: null,
				status: null,
				hasError: false
			}
		},

		computed : {
			categorias() {
				return this.$store.state.categorias
			},

			unidades() {
				return this.$store.state.unidades
			}
		},

		methods: {
			grabar(producto) {
				fetch('http://localhost/radikoVueDesktop/api/grabar-producto.php', {
					method: 'POST',
					body: JSON.stringify(producto)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						this.status = 1;
						this.statusMsg = "Producto guardado con éxito!";
						this.$router.push({ path: '/products', message: this.statusMsg });
					} else {
						this.status = 0;
						this.statusMsg = "Error - Algo salió mal"
						this.hasError = true
					}
				});
			},
			/*onFileSelected(event) {
				this.producto.foto 	= event.target.files[0].name			
			}*/
		},

		mounted() {
			this.$store.dispatch('loadCategorias')
			this.$store.dispatch('loadUnidades')
		}
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