<?php require_once 'conexion.php';

$buffer = file_get_contents('php://input');
$postData = json_decode($buffer, true);

$query = "INSERT INTO
productos 
SET
producto = :producto,
descripcion = :descripcion,
marca = :marca,
precio = :precio,
foto = NULL,
stock = :stock,
activo = '1',
estado = '1',
fecha_alta = NOW(),
fecha_baja = NULL,
CATEGORIAS_id_categoria = :categoria,
UNIDADES_DE_MEDIDA_id_unidad_medida = :unidad,
HUERTAS_id_huerta = '1'";

$stmt = $db->prepare($query);

$exito = $stmt->execute([
	'producto' => $postData['producto'],
	'descripcion' => $postData['descripcion'],
	'marca' => $postData['marca'],
	/*'foto' => $postData['foto'],*/
	'precio' => $postData['precio'],
	'stock' => $postData['stock'],
	'categoria' => $postData['categoria'],
	'unidad' => $postData['unidad']
]);

if($exito) {
	$salida = [
		'status' => 1,
		'data' => [
			'id_producto' => $db->lastInsertId(),
			'producto' => $postData['producto']
		]
	];
} else {
	$salida = [
		'status' => 0,
		'data' => [
			'error' => 'Error al grabar el registo.'
		]
	];
}

echo json_encode($salida);