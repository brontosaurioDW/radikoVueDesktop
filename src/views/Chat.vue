<template>
	<section class="chat">
		<ChatPage />
	</section>
</template>

<script>
	import ChatPage from '../components/ChatPage.vue'

	export default {
	  name: 'chat',
	  components: {
		ChatPage
	  },
		created () {
			this.$store.commit('SET_LAYOUT', 'principal-layout')
		}
	}
</script>