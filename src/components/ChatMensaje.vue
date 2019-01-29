<template>
	<div>
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
				<p v-if="feedback">{{ feedback }}</p>
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
</template>

<script>
	import Firebase from 'firebase';
	
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
		name: 'ChatMensaje',
		
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
				hoy : null,
				feedback: null
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
				/*refMensajes.push(this.newMensaje);
				//limpiamos
				this.newMensaje.mensaje = '';*/
				if(this.newMensaje.mensaje){
					refMensajes.push({
						nombre: this.$store.state.session.user.nombre,
						mensaje: mensaje.value,
						time: this.newMensaje.time
					}).then(function(){
					mensaje.value = "";
					});					
				}else{
					this.feedback = "Debes escribir algo"
				}		
			}
		}
		
	}	
</script>

<style>
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
</style>