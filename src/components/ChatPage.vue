<template>
	<div class="flex flex-top">
		<div class="col-8">
			<h2>Chat <span id="span-cliente"></span></h2>

			<div id="mensajes" class="simple-box" v-chat-scroll="{always: false, smooth: true}">
				<p v-if="mensajes.lenght==0">
					[No tienes ningún mensaje todavía]
				</p>
				<ul> 
					<li v-for="m in mensajes" :key="m.id">
						<div>
							<span>{{m.nombre}}</span>
							<span>{{m.mensaje}}</span>
						</div>	
						<span class="mensaje-hora">{{m.time}}</span>
					</li>
				</ul>
			</div>

			<form id="chat" class="form" @submit.prevent="guardarMensaje">
				<div class="form-row">
		
					<div class="wrap-input">
						<label class="label-input">Mensaje</label>
						<textarea 
							id="mensaje"
							class="textarea" 
							cols="15"
							rows="3"
							v-model="newMensaje.mensaje">
						</textarea>
					</div>
					
					<div class="text-right">
						<button type="submit" class="btn btn-primary btn-lg">Enviar</button>
					</div>
				</div>	
			</form>	
		</div>

		<div class="col-4">

			<h2>Clientes</h2>				
			<div id="clientes" class="simple-box">
				<ul v-for="cliente in clientes"
			:cliente="cliente">
					<li v-on:click="tomarCliente(cliente)">
						<div class="chat-user-photo">
							<img src="../assets/img/user-default.png" alt="Foto usuario" />
						</div>
						<div class="chat-user-data">
							<span>{{ cliente.nombre}} {{ cliente.apellido}}
							</span>
							<span>#{{ cliente.id_usuario}} es el id del usuario
							</span>
						</div>
						<div class="chat-hora">
							<span>10:06</span>
						</div>	
					</li>
				</ul>
			</div>
		</div>
	</div>
		

</template>

<script>
	import Firebase from 'firebase'
  
	var config = {
		apiKey: "AIzaSyASnf0ZeHB3PmVt_hxPxZDCqZGaz2HGKaY",
		authDomain: "radikochat-v2.firebaseapp.com",
		databaseURL: "https://radikochat-v2.firebaseio.com",
		projectId: "radikochat-v2",
		storageBucket: "radikochat-v2.appspot.com",
		messagingSenderId: "943658148967"
	}
	let app = Firebase.initializeApp(config);
  
	//Obtenemos la instancia de Firebase. La conexión a la base
	let fbdb = app.database();
  
	//LLAMAR A LOS DATOS DE LA BASE
	
	//Tenemos que crear referencias usando el método ref(url). La url es el nodo del Json al que queremos acceder
	let refMensajes = fbdb.ref('mensajes');


	export default {
		name: 'chat',
		
		computed: {
			clientes() {
				return this.$store.state.clientes;
			}
		},
		
		mounted() {
			this.$store.dispatch('loadClientes');
		},
		
		firebase:{
			mensajes: refMensajes
		},
		
		data(){
			return{
				newMensaje: {
					//nombre: this.$store.state.session.user.nombre,
					nombre: '',
					mensaje:'',
					time:'' /* la obtenemos del this.hoy */
				},
				hoy : null
			}		
		},
		
		//El objeto Vue tendrá una propiedad/variable llamada hoy que al cargarse la aplicación (crearse el objeto Vue) se actualizará con la fecha de hoy. Enero arranca en 0 -modificar-
		created : function(){
			this.hoy = Date.now();
			this.newMensaje.time = 
				new Date(this.hoy).getDate()+"-"+
				new Date(this.hoy).getMonth()+"-"+
				new Date(this.hoy).getFullYear()+" "+
				new Date(this.hoy).getHours()+":"+
				new Date(this.hoy).getMinutes();
		},
  
		methods:{
			//guardamos
			guardarMensaje(){
				console.log(this.newMensaje);
				/*refMensajes.push(this.newMensaje);
				//limpiamos
				this.newMensaje.mensaje = '';*/
				refMensajes.push({
					nombre: this.$store.state.session.user.nombre,
					mensaje: mensaje.value
				}).then(function(){
					mensaje.value = "";
				});
			},
			
			tomarCliente(cliente) {
				console.log('Tomo cliente:' + cliente.nombre);
				let spanCliente = document.getElementById('span-cliente');
				spanCliente.innerHTML = 'con ' + cliente.nombre;
			}
		}
	}
	
</script>

<style>
	h2 span{
		color: #7065ab;
	}
	#mensajes{
		max-height: 50vh;
		overflow: auto;
		padding: 15px;
	}
	#mensajes li{
		display: inline-block;
		width: 70%;
		margin-bottom: 5px;	
		color: white;
	}	
	#mensajes li:nth-child(even){
		float: right;
		text-align: right;
	}
	#mensajes li:nth-child(even) div{
		padding: 15px;
		background-color: #65bc9c;
	}
	#mensajes li:nth-child(odd) div{
		padding: 15px;
		background-color: #7065ab;
	}	
	#mensajes span{
		display: block;
	}
	#mensajes span:nth-child(1){
		margin-bottom: 10px;
		font-family: "Ebrima-Bold";
		text-transform: uppercase;
	}
	#mensajes .mensaje-hora{
		margin-top: 2px;
		font-size: 10px;
		color: #696969;
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
</style>
