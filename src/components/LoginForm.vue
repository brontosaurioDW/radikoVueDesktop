<template>
	<form class="LoginForm" @submit.prevent="attemptLogin()">
		<div class="LoginForm-fila">
			<label for="email">Email</label>
			<input type="email" id="email" v-model="usuario.email">
		</div>
		<div class="LoginForm-fila">
			<label for="password">Password</label>
			<input type="password" id="password" v-model="usuario.password">
		</div>
		<button class="FormLogin-submit">Ingresar</button>
	</form>
</template>

<script>

export default {
	name:'LoginForm',
	data() {
		return {
			usuario: {
				email: null,
				password: null
			}
		};
	},
	methods: {
		attemptLogin() {
			this.$store.dispatch('login', {
				email: this.usuario.email,
				password: this.usuario.password
			});
		}
	}
}
</script>

<style>
	
</style>