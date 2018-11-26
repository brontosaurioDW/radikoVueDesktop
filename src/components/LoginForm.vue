<template>

	<div class="login">
		<!-- <div class="error">Error de login: {{ errorMsj }}</div>		 -->
		<form class="LoginForm" @submit.prevent="attemptLogin()">
			<div>
				<label for="email">Email</label>
				<input type="email" id="email" v-model="usuario.email">
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" id="password" v-model="usuario.password">
			</div>
			<button class="FormLogin-submit">Ingresar</button>
		</form>
	</div>
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