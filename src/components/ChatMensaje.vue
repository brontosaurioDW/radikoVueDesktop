<template>
	<div>
		<div id="mensajes" class="simple-box" v-chat-scroll="{always: false, smooth: true, scrollonremoved: true}">
			<p v-if="!mensajes[0]">
				[No tienes ningún mensaje todavía]
			</p>
			<ul v-else> 
				<li v-for="m in mensajes" :key="m.id" :class="{'mensaje-usuario-logueado' : usuarioLogueado==m.autor}">	
					<div class="mensaje-wrapper">
						<div class="mensaje-texto">
							<span>{{m.autor}}</span>
							<span>{{m.mensaje}}</span>
						</div>	
						<span class="mensaje-hora">{{m.time}}</span>
					</div>
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
					<button type="submit" class="btn btn-terciary">Enviar</button>
				</div>
			</div>
		</form>	
	</div>
</template>

<script>

	import Firebase from 'firebase';
	
	var config = {
		apiKey: "AIzaSyARk56_VHK1MmRStD9nDwCPxiDUfkfM6b8",
		authDomain: "radikochat-ff500.firebaseapp.com",
		databaseURL: "https://radikochat-ff500.firebaseio.com",
		projectId: "radikochat-ff500",
		storageBucket: "radikochat-ff500.appspot.com",
		messagingSenderId: "99413101533"
	};
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
					autor: '',
					mensaje: '',
					time: '' /* la obtenemos del this.hoy */
				},
				hoy : null,
				feedback: null,
				usuarioLogueado: localStorage.getItem('usuario_logueado_nombre')
			}		
		},
		
		//El objeto Vue tendrá una propiedad/variable llamada hoy que al cargarse la aplicación (crearse el objeto Vue) se actualizará con la fecha de hoy. Enero arranca en 0 -modificar-
		created : function(){
			this.hoy = new Date();
			this.newMensaje.time = 
				new Date(this.hoy).getDate() + "-" +
				new Date(this.hoy).getMonth() + "-" +
				new Date(this.hoy).getFullYear() +" " +
				new Date(this.hoy).getHours() + ":" +
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
						autor: this.usuarioLogueado,
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
		padding: 20px;
		overflow: auto;
	}
	#mensajes ul {
		padding: 0 10px;
	}
	#mensajes li{
		margin-bottom: 15px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;	
	}	
	#mensajes li .mensaje-wrapper {
		width: 70%;
	}
	.mensaje-texto {
		padding: 25px;
		position: relative;
		background-color: #ededed;
		color: #656464;
	}	
	.mensaje-texto:before {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-right: 10px solid #ededed;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		position: absolute;
		top: 30px;
		left: -10px;
	}
	.mensaje-usuario-logueado{
		justify-content: flex-end;
	}
	.mensaje-usuario-logueado .mensaje-texto {
		color: white;
		background-color: #65bc9c;		
	}

	.mensaje-usuario-logueado .mensaje-texto:before {
		content: none;
	}

	.mensaje-usuario-logueado .mensaje-texto:after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-left: 10px solid #65bc9c;	
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		position: absolute;
		top: 30px;
		right: -10px;
	}
	#mensajes span{
		display: block;
		font-size: 14px;
	}
	#mensajes span:nth-child(1){
		margin-bottom: 10px;
		font-family: "Ebrima-Bold";
		text-transform: uppercase;
	}
	#mensajes .mensaje-hora{
		margin-top: 10px;
		font-size: 10px;
		color: #696969;
	}

	#chat .wrap-input{
		padding: 0;
	    background: none;
    	border: none;
	}

	#chat #mensaje {
		height: 120px;
		padding: 15px;
    	font-size: 14px;
		background: #fff;
		resize: none;
	}

	#chat label {
	    font-size: 18px;
    	color: #4b4b4b;
    	text-transform: uppercase;
    	font-family: "Gobold", sans-serif;
    	margin-bottom: 10px;
	}

	.gris{
		background-color: grey;
	}
	.rojo{
		background-color: red;
	}
</style>