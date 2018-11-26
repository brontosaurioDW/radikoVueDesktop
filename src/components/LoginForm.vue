<template>
	<!-- <div class="error">Error de login: {{ errorMsj }}</div>		 -->
	<form class="LoginForm form" @submit.prevent="attemptLogin()">
		<div class="form-row">
			<div class="wrap-input">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="usuario.email" class="input">
			</div>
			<!-- <div class="error"></div> -->
		</div>
		<div class="form-row">
			<div class="wrap-input">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="usuario.password" class="input">
			</div>
			<!-- <div class="error"></div> -->
		</div>
		<button class="FormLogin-submit btn btn-primary btn-lg">Ingresar</button>

		<p class="RegistroLink">No tenés una cuenta? <a href="#">Registrate</a></p>
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
				},
				//errorMsj: this.$route.session.status.message
			};
		},

		computed: {
			errors() {
				return this.$store.session.status.message
			}
		},

		methods: {
			attemptLogin() {
				this.$store.dispatch('login', {
					email: this.usuario.email,
					password: this.usuario.password
				});
				this.$router.push({ path: '/'})
			}
		}
	}
</script>

<style>
	.FormLogin-submit {
		width: 100%;
	}

	.RegistroLink {
		margin-top: 30px;
		text-align: center;
	}
</style>