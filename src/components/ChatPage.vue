<template>
	<div class="flex flex-top">
		<div class="col-8">
			<h2>Chat con <span>Pepe</span></h2>

			<div id="mensajes" class="simple-box">
				<ul>
					<li>
						<span>Pepe</span>
						<span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</span>
					</li>
					<li>
						<span>Huerta</span>
						<span>The point of using Lorem Ipsum.</span>
					</li>
					<li>
						<span>Pepe</span>
						<span>Page when looking at its layout.</span>
					</li>
					<li>
						<span>Huerta</span>
						<span>Will be distracted by the readable content.</span>
					</li>
				</ul>
			</div>

			<form id="chat" class="form">
				<div class="form-row">
				
					<div class="wrap-input">
						<label class="label-input">Nombre</label>
						<input 
						id="nombre"
						class="input" 
						type="text">
					</div>
		
					<div class="wrap-input">
						<label class="label-input">Mensaje</label>
						<textarea 
						id="mensaje"
						class="textarea" 
						cols="15"
						rows="3">
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
					<li>
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
	export default {
		name: 'chat',
		
		computed: {
			clientes() {
				return this.$store.state.clientes;
			}
		},
		
		mounted() {
			this.$store.dispatch('loadClientes');
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
		padding: 15px;
		color: white;
	}	
	#mensajes li:nth-child(even){
		float: right;
		background-color: #65bc9c;
		text-align: right;
	}
	#mensajes li:nth-child(odd){
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
