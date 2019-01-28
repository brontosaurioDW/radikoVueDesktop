v<template>
	<div class="user">
		<div class="user-photo">
			<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdGlkKbVAKyIZ4nqEDssi0DZLKLCVi1m4KD92sPs8lC95-OUYBg" alt="Usuario" />
		</div>
		<div class="user-info">
			<!-- <span class="block bold">{{ huerta.nombre_huerta }}</span> -->
			<span class="block bold">Bienvenido/a {{ nombre }}</span>
			<!-- <span>{{ huerta.razon_social }}</span> -->
			<!-- <span>{{ usuario.nombre }}</span> -->
		</div>
	</div>
</template>

<script>
	
	export default {

		data() {
			return {
				nombre: this.$store.state.session.user.nombre
			}
		},

		computed: {
			huerta() {
				return this.$store.state.huerta
			},

			usuario() {
				return this.$store.state.session.user.nombre
			}
		},

		mounted() {
			this.$store.dispatch('loadDatosHuerta')
		}
	}

</script>