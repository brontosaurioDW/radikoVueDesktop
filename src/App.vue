<template>
	<component :is="layout"></component>
</template>

<script>
	import LoginLayout from './components/layouts/Login.vue'
	import PrincipalLayout from './components/layouts/Principal.vue'
	import {mapState} from 'vuex'
  
	export default {
		components: {LoginLayout, PrincipalLayout},
		computed: mapState(['layout']),
	}
</script>
