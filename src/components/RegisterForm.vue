<template>
	<!-- <div class="error">Error de login: {{ errorMsj }}</div>		 -->
	<form class="LoginForm form" @submit.prevent="registro(usuario)">
		<div class="form-row">
			<div class="wrap-input">
				<label for="nombre">Nombre</label>
				<input type="nombre" name="nombre" id="nombre" v-model="usuario.nombre" class="input" v-validate="'required'">
			</div>
			<div class="error" v-show="errors.has('nombre')">{{ errors.first('nombre') }}</div>
			<div class="wrap-input">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="usuario.email" class="input" v-validate="'required|email'">
			</div>
			<div class="error" v-show="errors.has('email')">{{ errors.first('email') }}</div>
		</div>
		<div class="form-row">
			<div class="wrap-input">
				<label for="password">Password</label>
				<input type="password" name="password" id="password" v-model="usuario.password" class="input" v-validate="'required'" ref="password">
			</div>
			<div class="error" v-show="errors.has('password')">{{ errors.first('password') }}</div>
		</div>
		<div class="form-row">
			<div class="wrap-input">
				<label for="password_confirmation">Confirmar Password</label>
				<input type="password" name="password_confirmation" id="password_confirmation" v-model="usuario.password_confirmation" class="input" v-validate="'confirmed:password'" data-vv-as="password">
			</div>
			<div class="error" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</div>
		</div>
		<button class="FormLogin-submit btn btn-primary btn-lg">Registrarme</button>

		<p class="RegistroLink">Ya tenés una cuenta? <router-link to="/login">Ingresá</router-link></p>

	</form>
</template>

<script>

	import { Validator } from 'vee-validate';

	const diccionario = {
		custom: {
			nombre: {
				required: 'Debe ingresar un nombre'
			},
			email: {
				required: 'El campo email no puede estar vacio',
				email: 'Debe ingresar un mail válido'
			},
			password: {
				required: 'Debe ingresar una contraseña'
			},
			password_confirmation: {
				required: 'Debe ingresar una contraseña',
				confirmed: 'las contraseñas deben coincidir'
			}
		}
	};

	Validator.localize('en', diccionario);

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