import Vue from 'vue';
import Vuex from 'vuex';

let apiRoute = 'http://localhost/radikoVueDesktop/api/';

Vue.use(Vuex);

// Seteamos la variable auth en null si no hay un local storage guardado
var authFlag 	= false;
var statusFlag 	= null;

if(localStorage.getItem('usuario_logueado_token')) {
	authFlag = true;

	if(localStorage.getItem('usuario_logueado_tipo') != 'cliente') {
		statusFlag = true;
	} else {
		statusFlag = false;
	}
} else {
	authFlag = false;
	statusFlag 	= null;
}

export default new Vuex.Store({
	state: {
		layout: 'login-layout',
		huerta: [],
		pedidos: [],
		// producto: {
		// 	producto: '',
		// 	descripcion: '',
		// 	marca: '',
		// 	precio: '',
		// 	stock: '',
		// 	categoria: '',
		// 	estado: '',
		// 	unidad: ''
		// },
		producto: {},
		productos: [],
		categorias: [],
		unidades: [],
		clientes: [],
		huertas: [],
		session: {
			auth: authFlag,
			logueado: statusFlag,
			user: {
				id_usuario: null,
				nombre: null,
				email: null,
				token: null
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
		setHuertas(state, newHuerta) {
			state.huertas = newHuerta
		},
		setSessionAuth(state, userData) {			
			state.session.user.nombre = userData.nombre;
			state.session.user.email = userData.email;
			state.session.user.id_usuario = userData.id_usuario;
			state.session.user.token = userData.token;
			state.session.user.tipo_de_usuario = userData.tipo_de_usuario;

			localStorage.setItem('usuario_logueado_token', userData.token);
			localStorage.setItem('usuario_logueado_nombre', userData.nombre);
			localStorage.setItem('usuario_logueado_tipo', userData.tipo_de_usuario);
			localStorage.setItem('usuario_logueado_id', userData.id_usuario);

			if (localStorage.getItem('usuario_logueado_token')) {
				state.session.auth = true;
			}	

			if (localStorage.getItem('usuario_logueado_tipo') != 'cliente') {
				state.session.logueado = true;
			} else {
			    state.session.logueado = false;
			}		
		},
		setSessionLogout(state) {
			if (!localStorage.getItem('usuario_logueado_token')) {
				state.session.auth = false;
			}	
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
			fetch(apiRoute + 'clientes.php?id=' + localStorage.getItem('usuario_logueado_id'))
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setClientes', data);
			});	
		},

		loadHuertas(context) {
			fetch(apiRoute + 'huertas.php?id=' + localStorage.getItem('usuario_logueado_id'))
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setHuertas', data);
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
					method: 'POST',
					body: JSON.stringify(userData)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						context.commit('setSessionAuth', {
							nombre		: data.data.nombre,
							email		: data.data.email,
							id_usuario	: data.data.id_usuario,
							token		: data.data.token,
							tipo_de_usuario	: data.data.tipo_de_usuario
						})
						resolve();
					} else {
						reject();
					}
				})
			});
		},

		register(context, userData) {
			return new Promise((resolve, reject) => {
				fetch(apiRoute + 'registro.php', {
					method: 'post',
					body: JSON.stringify(userData)
				})
				.then(response => response.json())
				.then(data => {
					if (data.status == 1) {
						resolve();
					} else {
						reject();
					}
				})
			});
		},

		storeProduct(context, productData) {
			return new Promise((resolve, reject) => {
				fetch(apiRoute + 'grabar-producto.php', {
					method: 'post',
					body: JSON.stringify(productData)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						resolve()
					} else {
						reject()
					}
				})
			})
		},

		editProduct(context, productData) {
			return new Promise((resolve, reject) => {
				fetch(apiRoute + 'editar-producto.php', {
					method: 'post',
					body: JSON.stringify(productData)
				})
				.then(response => response.json())
				.then(data => {
					if(data.status == 1) {
						resolve()
					} else {
						reject()
					}
				})
			})
		},

		loadSingleProduct(context, id) {
			return new Promise((resolve, reject) => {
				fetch(apiRoute + 'producto.php?id=' + id)
				.then(response => response.json())
				.then(data => {
					context.commit('setSingleProduct', data);
					resolve()
				})
			})	
		},

		logout(context) {
			localStorage.removeItem('usuario_logueado_token');
			localStorage.removeItem('usuario_logueado_nombre');
			localStorage.removeItem('usuario_logueado_tipo');
			localStorage.removeItem('usuario_logueado_id');

			context.commit('setSessionLogout');
		}
	}
})