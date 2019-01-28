<template>
	<header class="col-left">
		<h1>
			<router-link to="/" class="nav-link">
				Radiko
			</router-link>
		</h1>

		<DatosHuerta />

		<nav class="menu">
			<ul>
				<li class="nav-item">
					<router-link to="/products" class="nav-link">
						<i class="icon icon-fruit"></i>
						<span>Mis productos</span>
					</router-link>
					<ul class="submenu">
						<li>
							<router-link to="/products/create" class="nav-link">
								<i class="icon">+</i>
								<span>Agregar producto</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="#">
						<i class="icon icon-cart"></i>
						<span>Mis pedidos</span>
					</a>
				</li>
				<li>
					<a href="#">
						<i class="icon icon-user"></i>
						<span>Mis datos</span>
					</a>
				</li>
				<li>
					<router-link to="/chat" class="nav-link">
						<i class="icon icon-chat"></i>
						<span>Chat</span>
					</router-link>
				</li>
				<li>
					<a @click="logout()">
						<i class="icon icon-logout"></i>
						<span>Cerrar sesión</span>
					</a>
				</li>				
			</ul>
		</nav>
	</header>
</template>

<script>

	import DatosHuerta from './DatosHuerta.vue'

	export default {
		name: 'menuCpanel',

		components: {
			DatosHuerta
		},

		methods: {
			logout() {
				this.$store.dispatch('logout')
				this.$router.push('/login')
			}
		}
	}
</script>
