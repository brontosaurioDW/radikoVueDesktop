<template>
	<div class="col-left">
		<h1>
			<router-link to="/" class="nav-link">
				Radiko
			</router-link>
		</h1>

		<DatosHuerta />

		<ul class="menu">
			<li class="nav-item">
				<router-link to="/products" class="nav-link">
					<i class="icon icon-fruit"></i>
					<span>Mis productos</span>
				</router-link>
				<ul class="submenu">
					<li>
						<router-link to="/productos/create" class="nav-link">
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
				<a href="#">
					<i class="icon icon-chat"></i>
					<span>Chat</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i class="icon icon-logout"></i>
					<span>Cerrar sesión</span>
				</a>
			</li>
		</ul>
	</div>
</template>



<script>

	import DatosHuerta from './DatosHuerta.vue'

	export default {
		name: 'menuCpanel',

		components: {
			DatosHuerta
		}
	}
</script>
