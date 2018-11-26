import Vue from 'vue';
import Vuex from 'vuex';

let apiRoute = 'http://localhost/proyectos/radikoVue/api/';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		huerta: [],
		pedidos: [],
		productos: [],
		categorias: [],
		unidades: []
	},

	mutations: {
		setHuerta(state, newHuerta) {
			state.huerta = newHuerta
		},
		setPedidos(state, newPedido) {
			state.pedidos = newPedido
		},
		setProducts(state, newProduct) {
			state.productos = newProduct
		},
		setCategorias(state, newCategoria) {
			state.categorias = newCategoria
		},
		setUnidades(state, newUnidades) {
			state.unidades = newUnidades
		}
	},

	actions: {

		loadDatosHuerta(context) {
			fetch( apiRoute + 'huerta.php?id=1')
			.then(respuesta => respuesta.json())
			.then(data => {
				// this.huerta = data;
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

		loadSingleProduct(context) {
			let id = this.$route.params.id;
			fetch(apiRoute + 'producto.php?id=' + id)
			.then(response => response.json())
			.then(data => {
				this.producto = data;
			});
		},

		loadCategorias(context) {
			fetch(apiRoute + 'categorias.php')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setCategorias', data);
			});	
		},

		loadUnidades(context) {
			fetch(apiRoute + 'unidades.php')
			.then(respuesta => respuesta.json())
			.then(data => {
				context.commit('setUnidades', data);
			});	
		}
	}
})






