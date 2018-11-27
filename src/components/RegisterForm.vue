<template>
	<!-- <div class="error">Error de login: {{ errorMsj }}</div>		 -->
	<form class="LoginForm form" @submit.prevent="registro(usuario)">
		<div class="form-row">
			<div class="wrap-input">
				<label for="nombre">Nombre</label>
				<input type="nombre" id="nombre" v-model="usuario.nombre" class="input">
			</div>
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
		<div class="form-row">
			<div class="wrap-input">
				<label for="confirm_password">Confirmar Password</label>
				<input type="password" id="confirm_password" v-model="usuario.confirm_password" class="input">
			</div>
			<!-- <div class="error"></div> -->
		</div>
		<button class="FormLogin-submit btn btn-primary btn-lg">Registrarme</button>

		<p class="RegistroLink">Ya tenés una cuenta? <router-link to="/login">Ingresá</router-link></p>

	</form>
</template>

<script>
	export default {
		name:'RegisterForm',
		data() {
			return {
				usuario: {
					nombre: null,
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

			registro(usuario) {
				fetch('http://localhost/radikoVueDesktop/api/registro.php', {
					method: 'POST',
					body: JSON.stringify(usuario)
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
						this.isError = true
					}
				});
			},

			attemptLogin() {
				this.$store.dispatch('login', {
					email: this.usuario.email,
					password: this.usuario.password
				}).then( () => { this.$router.push({name: 'home'}) });
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