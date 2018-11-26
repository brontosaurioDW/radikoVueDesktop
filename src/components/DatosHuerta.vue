v<template>
	<div class="user">
		<div class="user-photo">
			<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdGlkKbVAKyIZ4nqEDssi0DZLKLCVi1m4KD92sPs8lC95-OUYBg" alt="Huerta" />
		</div>
		<div class="user-info">
			<span class="block bold">{{ huerta.nombre_huerta }}</span>
			<span>{{ huerta.razon_social }}</span>
		</div>
	</div>
</template>

<script>
	
	export default {
		computed: {
			huerta() {
				return this.$store.state.huerta
			}
		},

		mounted() {

			this.$store.dispatch('loadDatosHuerta')
		}
	}

</script>