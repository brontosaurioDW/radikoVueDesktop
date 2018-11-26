<template>
	<div class="LoginPage">
		<h1 class="logo">Radiko</h1>
		<span class="text-center">Iniciar Sesión</span>
		<LoginForm />
	</div>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
	name:'LoginPage',
	components: {
		LoginForm
	}
}
</script>

<style>
	h1.logo {
		background: url('../assets/img/logo-dk.png') no-repeat 0 0 transparent;
		display: block;
		width: 140px;
		height: 95px;
		font-size: 0;
		color: transparent;
		background-size: 100%;
		margin: 0 auto 30px;
	}

	.loginPage {
		width: 25%;
	}

	.login {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		min-height: 100vh;
	}
</style>