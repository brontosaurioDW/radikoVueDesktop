<template>
	<div>
		
		<div v-if="hasError" class="error">{{ errorMsj }}</div>

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
		</form>

		<p class="RegistroLink">Ya tenés una cuenta? <router-link to="/login" class="link">Ingresá</router-link></p>
	</div>
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
				hasError: false,
				errorMsj: null
			};
		},

		computed: {
			errors() {
				return this.$store.session.status.message
			}
		},

		methods: {
			registro(usuario) {
				this.$validator.validate()
				this.$store.dispatch('register', {
					nombre: usuario.nombre,
					email: usuario.email,
					password: usuario.password
				}).then(() => {
					this.$router.push('/')
				}).catch(() => {	
					this.hasError = true
					this.errorMsj =  'Error - Verificá los campos nuevamente'
				})
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