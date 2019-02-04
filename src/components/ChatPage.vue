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
						<li v-on:click="CargarChatMensaje(componente, cliente)" 
							v-for="cliente in clientes" 
							:cliente="cliente.id_usuario" 
							:id="cliente.nombre" 
							class="listado-clientes">

							<div class="flex">
								<div class="chat-user-photo">
									<img :src="imagen(cliente).path" :alt="imagen(cliente).alt" />
								</div>
								<div class="chat-user-data">
									<span>{{ cliente.nombre}} {{ cliente.apellido}} </span>
									<span>#{{ cliente.id_usuario}} es el id del usuario</span>
								</div>
							</div>
							<div class="chat-hora">
								<span>10:06</span>
							</div>	
						</li>
					</ul>
				
					<ul v-else-if="clienteTipoHuerta == false">
						<li v-on:click="CargarChatMensaje(componente, huerta)" 
							v-for="huerta in huertas" 
							:huerta="huerta.id_huerta" 
							:id="huerta.nombre_huerta" 
							class="listado-clientes">

							<div class="flex">
								<div class="chat-user-photo">
									<img :src="imagen(huerta).path" :alt="imagen(huerta).alt" />
								</div>
								<div class="chat-user-data">
									<span>{{ huerta.nombre_huerta }}</span>
								</div>
							</div>
							<div class="chat-hora">
								<span>10:06</span>
							</div>	
						</li>
					</ul> 
				</div>
			</div>

			<div class="col-8 colm-12">			
				<h2>Chat <span id="span-cliente"></span></h2>
				
				<!-- keep-alive: la instancia del componente se almacena en caché una vez que se crea por primera vez --> 
				<keep-alive>
					<component v-bind:is="vistaActual" />
				</keep-alive>			
			</div>
		</div>
	</div>
</template>

<script>
	import ChatMensaje from './ChatMensaje.vue';
	import ChatMensajeVacio from './ChatMensajeVacio.vue';
  
	export default {
		name: 'chat',
		
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
		},
		
		data() {
            return {
                componente: 'ChatMensaje',
                vistaActual: 'ChatMensajeVacio'
            }
        },

		methods:{
			CargarChatMensaje(vista, usuario) {                
                this.vistaActual = vista;

                let nombreDelUsuarioDelChat = document.getElementById('span-cliente');

                if (this.clienteTipoHuerta == true) {
					nombreDelUsuarioDelChat.innerHTML = 'con ' + usuario.nombre;
                } else {
					nombreDelUsuarioDelChat.innerHTML = 'con ' + usuario.nombre_huerta;
                }
            },
			imagen(cliente){
				if(cliente.foto != null){
					return{
						path: require("../assets/img/" + cliente.foto),
						alt: 'Foto de ' + cliente.nombre + ' ' + cliente.apellido
					} 
				}else{
					return{
						path: require("../assets/img/user-default.png"),
						alt: 'Imagen de perfil por defecto'
					} 
				}	
			},
			imagen(huerta){
				if(huerta.foto_huerta != null){
					return{
						path: require("../assets/img/" + huerta.foto_huerta),
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
		margin-bottom: 5px;
		padding: 15px 0;
		border-bottom: 1px solid #ddd;
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
