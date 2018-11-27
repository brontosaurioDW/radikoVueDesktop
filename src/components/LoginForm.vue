<template>
	<!-- <div class="error">Error de login: {{ errorMsj }}</div>		 -->
	<form class="LoginForm form" @submit.prevent="attemptLogin(usuario)">

		<div class="form-row">
			<div class="wrap-input">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="usuario.email" class="input" v-validate="'required|email'">
			</div>
			<div class="error" v-show="errors.has('email')">{{ errors.first('email') }}</div>
		</div>
		<div class="form-row">
			<div class="wrap-input">
				<label for="password">Password</label>
				<input type="password" name="password" id="password" v-model="usuario.password" class="input" v-validate="'required'">
			</div>
			<div class="error" v-show="errors.has('password')">{{ errors.first('password') }}</div>
		</div>
		<button class="FormLogin-submit btn btn-primary btn-lg">Ingresar</button>
		
		<p class="RegistroLink">No tenés una cuenta? <router-link to="/register">Registrate</router-link></p>

	</form>

</template>

<script>

	import { Validator } from 'vee-validate';

	const diccionario = {
		custom: {
			email: {
				required: 'El campo email no puede estar vacio',
				email: 'Debe ingresar un mail válido'
			},
			password: {
				required: () => 'Debe ingresar una contraseña'
			}
		}
	};

	Validator.localize('en', diccionario);

	export default {
		name:'LoginForm',

		data() {
			return {
				usuario: {
					email: null,
					password: null,
				},
			};
		},

		computed: {
			errors() {
				return this.$store.session.status.message
			}
		},

		methods: {
			attemptLogin() {
				this.$validator.validate()
				this.$store.dispatch('login', {
					email: this.usuario.email,
					password: this.usuario.password
				})
				this.$router.push('/')
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