<template>
	<section class="home">
		<HomePage />
	</section>
</template>

<script>
	
// @ is an alias to /src
import HomePage from '../components/HomePage.vue'

export default {
	name: 'home',
	components: {
		HomePage
	},
	mounted () {
		this.$store.commit('SET_LAYOUT', 'principal-layout')
	}
}
</script>