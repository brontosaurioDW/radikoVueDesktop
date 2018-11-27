<template>
	<div class="RegisterPage">

		<RegisterPage />

	</div>
</template>

<script>
	
	import RegisterPage from '../components/RegisterPage.vue'

	export default {
		name: 'home',
		components: {
			RegisterPage
		},
		created() {
			this.$store.commit('SET_LAYOUT', 'login-layout')
		}
	}
</script>