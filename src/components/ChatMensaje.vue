<template>
	<div>
		<div id="mensajes" class="simple-box" :idDelOtroUsuario="idDelOtroUsuario" v-chat-scroll="{always: false, smooth: true, scrollonremoved: true}">
			<p v-if="!mensajesPrivados[0]">
				[No tienes ningún mensaje todavía]
			</p>
			<ul v-else> 
				<li v-for="m in mensajesPrivados" :key="m.data.id" :class="{'mensaje-usuario-logueado' : usuarioLogueado==m.data.autor}">	
					<div class="mensaje-wrapper">
						<div class="mensaje-texto">
							<span>{{m.data.autor}}</span>
							<span>{{m.data.mensaje}}</span>
						</div>	
						<span class="mensaje-hora">{{m.data.time}}</span>
					</div>
				</li>
			</ul>
		</div>
		
		<form id="chat" class="form" @submit.prevent="guardarMensaje">
			<div class="form-row">
				<p v-if="feedback">{{ feedback }}</p>
				<div class="wrap-input">
					<label class="label-input">Mensaje</label>
					<textarea id="mensaje" class="textarea" cols="15" rows="3" v-model="newMensaje.textoDelMensaje"></textarea>
				</div>
			
				<div class="text-right">
					<button type="submit" class="btn btn-terciary">Enviar</button>
				</div>
			</div>
		</form>	
	</div>
</template>

<script>

	import { refMensajes } from '../firebase.js';
	
	export default {
		name: 'ChatMensaje',
		
		firebase:{
			mensajes: refMensajes
		},

		props: {
			idDelOtroUsuario: String,
			mensajesPrivados: Array
		},
		
		data(){
			return{
				newMensaje: {
					nombreChat: '',
					autor: '',
					mensaje: '',
					time: '' 
				},
				hoy : null,
				feedback: null,
				usuarioLogueado: localStorage.getItem('usuario_logueado_nombre'),			
				idDelUsuarioLogueado: localStorage.getItem('usuario_logueado_id'),
			}		
		},

		created : function(){
			this.hoy = new Date();
			this.newMensaje.time = 
				new Date(this.hoy).getDate() + "-" +
				new Date(this.hoy).getMonth() + "-" +
				new Date(this.hoy).getFullYear() +" " +
				new Date(this.hoy).getHours() + ":" +
				new Date(this.hoy).getMinutes();
		},

		methods: {
			guardarMensaje() {
				var self = this;

				var mensajeModel = self.newMensaje.textoDelMensaje;

				if(mensajeModel){
					var usuario1 = self.idDelUsuarioLogueado;
					var usuario2 = self.idDelOtroUsuario;	
					var nombreDelChat = 'chat_' + (usuario1 < usuario2 ? usuario1 + '_' + usuario2 : usuario2 + '_' + usuario1);

					refMensajes.push({
						nombreChat: nombreDelChat,
						autor: self.usuarioLogueado,
						idDelOtroUsuario: self.idDelOtroUsuario,
						idDelUsuarioLogueado: self.idDelUsuarioLogueado,
						mensaje: mensajeModel,
						time: self.newMensaje.time
					}).then(function() {
						self.newMensaje.textoDelMensaje = '';
					});
				} else {
					this.feedback = 'Debes escribir algo'
				}		
			},
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
		background-color: #f3f3f3;
		color: #656464;
	}	
	.mensaje-texto:before {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-right: 10px solid  #f3f3f3;
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
		line-height: 150%;
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