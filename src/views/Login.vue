<template>
	<div class="loginPage">

		<LoginPage />

	</div>
</template>

<script>
	
	import LoginPage from '../components/LoginPage.vue'

	export default {
		name: 'home',
		components: {
			LoginPage
		},
		created() {
			this.$store.commit('SET_LAYOUT', 'login-layout')
		}
	}
</script>