<template>		
	<li>
		<span class="bold">{{ unidad.unidad_de_medida }}</span> {{ unidad.unidad_extendida }}	
	</li>
</template>

<script>
	export default {
		name: 'ProductsTableDisclaimerRow',

		props: {
			unidad: Object,
			i: Number
		},
	}
</script>