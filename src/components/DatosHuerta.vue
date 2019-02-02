<template>
	<div class="usuario">
		<div class="user">
			<div class="user-photo">
				<img :src="imagen.path" :alt="nombre" />
			</div>
			<div class="user-info">
				<span class="block bold">
					Bienvenido/a {{ nombre }}
					<p v-if="clienteTipoHuerta == true">{{ huerta.nombre_huerta }}</p>
				</span>			
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {

		data() {
			return {
				nombre: localStorage.getItem('usuario_logueado_nombre'),
				huerta: {}
			}
		},

		computed: {
			usuario() {
				return localStorage.getItem('usuario_logueado_nombre')
			},
			imagen(){
				if (this.huerta.foto_huerta != null) {
					return {
						path: require("../assets/img/" + this.huerta.foto_huerta)
					};
				} else {
					return {
						path: require("../assets/img/user-default.png")
					};
				}
			},
			clienteTipoHuerta() {
				return this.$store.state.session.tipoHuerta;
			}
		},

		mounted() {
			let id = localStorage.getItem('usuario_logueado_id');

			this.$store.dispatch('loadDatosHuerta', id)
			.then(data => {
				this.huerta = this.$store.state.huerta;
			});
		}
	}

</script>