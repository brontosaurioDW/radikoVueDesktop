<template>
	<div class="flex flex-top">
		<div class="col-8">
			<h2>Chat</h2>

			<div id="mensajes"></div>

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
						rows="5">
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

				<div class="simple-box box-a">


			</div>
		</div>
	</div>
		

</template>

<script>
	export default {
		name: 'chat',


	}

	

</script>