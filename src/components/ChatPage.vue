<template>
	<div class="flex flex-top">
		<div class="col-4">
			<h2>Clientes</h2>				
			<div id="clientes" class="simple-box">
				<ul>
					<li v-bind:class="{ active: isActive }" 
						v-on:click="CargarChatMensaje(componente, cliente)" 
						v-for="cliente in clientes" 
						:cliente="cliente.id_usuario" 
						:id="cliente.nombre" 
						class="listado-clientes">

						<div class="flex">
							<div class="chat-user-photo">
								<img src="../assets/img/user-default.png" alt="Foto usuario" />
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
			</div>
		</div>

		<div class="col-8">			
			<h2>Chat <span id="span-cliente"></span></h2>
			<!-- keep-alive: la instancia del componente se almacena en caché una vez que se crea por primera vez --> 
			<keep-alive>
				<component v-bind:is="vistaActual" />
			</keep-alive>			
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
			}
		},
		
		mounted() {
			this.$store.dispatch('loadClientes');
		},
		
		data() {
            return {
            	isActive: false,
                componente: 'ChatMensaje',
                vistaActual: 'ChatMensajeVacio'
            }
        },

		methods:{
			CargarChatMensaje(vista, cliente) {                
                this.vistaActual = vista;

				console.log('Tomo cliente:' + cliente.nombre);

				let spanCliente = document.getElementById('span-cliente');
				spanCliente.innerHTML = 'con ' + cliente.nombre;

				this.isActive = !this.isActive;
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
	.li-cliente-seleccionado{
		background-color: grey;
	}
</style>
