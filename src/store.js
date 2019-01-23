import Vue from 'vue';
import Vuex from 'vuex';

let apiRoute = 'http://localhost/radikoVueDesktop/api/';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		layout: 'login-layout',
		huerta: [],
		pedidos: [],
		productos: [],
		categorias: [],
		unidades: [],
		session: {
			auth: false,
			user: {
				nombre: null,
				email: null
			},
			status: {
				message: null
			}
		}
	},

	mutations: {

		SET_LAYOUT (state, newLayout) {
			state.layout = newLayout
		},
		setHuerta(state, newHuerta) {
			state.huerta = newHuerta
		},
		setPedidos(state, newPedido) {
			state.pedidos = newPedido
		},
		setProducts(state, newProduct) {
			state.productos = newProduct
		},
		setSingleProduct(state, newProduct) {
			state.producto = newProduct
		},
		setCategorias(state, newCategoria) {
			state.categorias = newCategoria
		},
		setUnidades(state, newUnidades) {
			state.unidades = newUnidades
		},
		setClientes(state, newCliente) {
			state.clientes = newCliente
		},
		setSessionAuth(state, userData) {
			state.session.auth = true;
			state.session.user.nombre = userData.nombre;
			state.session.user.email = userData.email;
		},
		setSessionLogout(state) {
			state.session.auth = false;
		}
	},

	actions: {

		loadDatosHuerta(context) {
			fetch( apiRoute + 'huerta.php?id=1')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setHuerta', data);
			});
		},

		loadPedidos(context) {
			fetch( apiRoute + 'pedidos.php?id=1')
			.then(response => response.json())
			.then(data => {
				context.commit('setPedidos', data);
			});
		},

		loadProducts(context) {
			fetch(apiRoute + 'productos.php')
			.then(response => response.json())
			.then(data => {
				context.commit('setProducts', data);
			});
		},

		loadCategorias(context) {
			fetch(apiRoute + 'categorias.php')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setCategorias', data);
			});	
		},
		
		loadClientes(context) {
			fetch(apiRoute + 'clientes.php?id=1')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setClientes', data);
			});	
		},

		loadUnidades(context) {
			fetch(apiRoute + 'unidades.php')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setUnidades', data);
			});	
		},

		login(context, userData) {
			return new Promise((resolve, reject) => {
				fetch(apiRoute + 'login.php', {
					method: 'post',
					body: JSON.stringify(userData)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						context.commit('setSessionAuth', {
							nombre: data.data.nombre,
							email: data.data.email
						})
						resolve();
					} else {
						reject();
							// retorna mensaje de error? Deje comentado los espacios para el error en LoginForm.vue (lineas 9 y 16)
					}
				})
			});
		},

		logout(context) {
			context.commit('setSessionLogout');
		}
	}
})