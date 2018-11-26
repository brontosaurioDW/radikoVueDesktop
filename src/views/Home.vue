<template>
	<div class="home">

		<HomePage />

	</div>
</template>

<script>
// @ is an alias to /src
import HomePage from '../components/HomePage.vue'

export default {
	name: 'home',
	components: {
		HomePage
	},
	created () {
		this.$store.commit('SET_LAYOUT', 'principal-layout')
	}
}
</script>