<template>
	<div class="chat-page">
		<h2 v-if="clienteTipoHuerta == true && !clientes[0] || clienteTipoHuerta == false && !huertas[0]">
			No hay chats disponibles
		</h2>

		<div v-else class="flex flex-top noflexm">
			<div class="col-4 colm-12">

				<h2 v-if="clienteTipoHuerta == true">Clientes</h2>				
				<h2 v-else="clienteTipoHuerta == false">Huertas</h2>		

				<div id="clientes" class="simple-box">

					<ul v-if="clienteTipoHuerta == true">
						<li v-on:click="CargarChatMensaje(componente, cliente, cliente.id_usuario)" 
							v-for="cliente in clientes" 
							:cliente="cliente.id_usuario" 
							:id="cliente.nombre" 
							class="listado-clientes">

							<div class="flex">
								<div class="chat-user-photo">
									<img :src="ImagenCliente(cliente).path" :alt="ImagenCliente(cliente).alt" />
								</div>
								<div class="chat-user-data">
									<span>{{ cliente.nombre}} {{ cliente.apellido}} </span>
								</div>
							</div>
						</li>
					</ul>
				
					<ul v-else-if="clienteTipoHuerta == false">
						<li v-on:click="CargarChatMensaje(componente, huerta, huerta.USUARIOS_id_usuario)" 
							v-for="huerta in huertas" 
							:huerta="huerta.id_huerta" 
							:id="huerta.nombre_huerta" 
							class="listado-clientes">

							<div class="flex">
								<div class="chat-user-photo">
									<img :src="ImagenHuerta(huerta).path" :alt="ImagenHuerta(huerta).alt" />
								</div>
								<div class="chat-user-data">
									<span>{{ huerta.nombre_huerta }}</span>
								</div>
							</div>
						</li>
					</ul> 
				</div>
			</div>

			<div class="col-8 colm-12">			
				<h2>Chat <span id="span-cliente"></span></h2>
				
				<!-- keep-alive: la instancia del componente se almacena en caché una vez que se crea por primera vez --> 
				<keep-alive>
					<component v-bind:is="vistaActual" :idDelOtroUsuario="idDelOtroUsuario" :mensajesPrivados="mensajesPrivados" />
				</keep-alive>			
			</div>
		</div>
	</div>
</template>

<script>
	import ChatMensaje from './ChatMensaje.vue';
	import ChatMensajeVacio from './ChatMensajeVacio.vue';

	import { refMensajes } from '../firebase.js';
  
	export default {
		name: 'chat',

		firebase:{
			mensajes: refMensajes
		},
		
		components: {
			ChatMensaje,
			ChatMensajeVacio
		},
		
		computed: {
			clientes() {
				return this.$store.state.clientes;
			},
			huertas() {
				return this.$store.state.huertas;
			},
			clienteTipoHuerta() {
				return this.$store.state.session.tipoHuerta;
			}
		},
		
		mounted() {
			this.$store.dispatch('loadClientes');
			this.$store.dispatch('loadHuertas');
			this.ActiveListItem();
		},
		
		data() {
            return {
                componente: 'ChatMensaje',
                vistaActual: 'ChatMensajeVacio',
                idDelOtroUsuario: '',
                idDelUsuarioLogueado: localStorage.getItem('usuario_logueado_id'),
                mensajesPrivados: []
            }
        },

		methods:{
			CargarChatMensaje(vista, usuario, id) {   

                this.vistaActual = vista;

                let nombreDelUsuarioDelChat = document.getElementById('span-cliente');

                if (this.clienteTipoHuerta == true) {
					nombreDelUsuarioDelChat.innerHTML = 'con ' + usuario.nombre;
                } else {
					nombreDelUsuarioDelChat.innerHTML = 'con ' + usuario.nombre_huerta;
                }

                this.idDelOtroUsuario = id;

                var usuario1 = this.idDelUsuarioLogueado;
            	var usuario2 = id;	
            	var nombreDelChat = 'chat_' + (usuario1 < usuario2 ? usuario1 + '_' + usuario2 : usuario2 + '_' + usuario1);
            	var mensajesPrivados = [];

            	refMensajes.orderByChild('nombreChat').equalTo(nombreDelChat).on('child_added', function(data) {
            		mensajesPrivados.push({
            			id: data.key, 
            			data: data.val()
            		});
            	});

            	this.mensajesPrivados = mensajesPrivados;
            },

            ActiveListItem(){            	
				var listContent = document.getElementById('clientes');
                var liItem = listContent.getElementsByClassName('listado-clientes');

				for (var i = 0; i < liItem.length; i++) {
					liItem[i].addEventListener('click', function() {
						var current = document.getElementsByClassName('active');

						if (current.length > 0) { 
							current[0].className = current[0].className.replace(' active', '');
						}

						this.className += ' active';
					});
				}
            },

			ImagenCliente(cliente){
				if(cliente.foto != null){
					return{
						path: require("../assets/img/usuarios/" + cliente.foto),
						alt: 'Foto de ' + cliente.nombre + ' ' + cliente.apellido
					} 
				}else{
					return{
						path: require("../assets/img/user-default.png"),
						alt: 'Imagen de perfil por defecto'
					} 
				}	
			},

			ImagenHuerta(huerta){
				if(huerta.foto_huerta != null){
					return{
						path: require("../assets/img/huertas/" + huerta.foto_huerta),
						alt: 'Foto de ' + huerta.nombre_huerta
					} 
				}else{
					return{
						path: require("../assets/img/user-default.png"),
						alt: 'Imagen de perfil por defecto'
					} 
				}	
			}
		}
	}
	
</script>

<style>
	h2 span{
		color: #7065ab;
	}
	#clientes{
		padding: 15px;
	}
	#clientes li{
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 15px 10px;
		border-bottom: 1px solid #ddd;
	}
	#clientes li.active {
		background: #f3f3f3;
	}
	.chat-user-photo img{
		max-width: 36px;
		margin-right: 10px;
	}
	.chat-user-data{
		width: 265px;
	}
	.chat-user-data span{
		display: block;
	}
	.chat-user-data span:nth-child(1){
		display: block;
		margin-bottom: 5px;
		font-family: "Ebrima-Bold";
		text-transform: uppercase;
	}
	.chat-user-data span:nth-child(2){
		color: #696969;
	}
	.chat-hora span{
		font-size: 10px;
		color: #696969;
	}
	.listado-clientes {
		cursor: pointer;
	}
</style>
