<?php require_once 'conexion.php';

$buffer = file_get_contents('php://input');
$postData = json_decode($buffer, true);

$query = "UPDATE 
productos 
SET
producto = :producto,
descripcion = :descripcion,
marca = :marca,
precio = :precio,
stock = :stock,
activo = :activo,
stock = :stock,
fecha_alta = NOW(),
fecha_baja = NULL,
CATEGORIAS_id_categoria = :categoria,
UNIDADES_DE_MEDIDA_id_unidad_medida = :unidad,
HUERTAS_id_huerta = 1
WHERE
id_producto = :id_producto";

$stmt = $db->prepare($query);

$exito = $stmt->execute([
	'producto' => $postData['producto'],
	'descripcion' => $postData['descripcion'],
	'marca' => $postData['marca'],
	'precio' => $postData['precio'],
	'stock' => $postData['stock'],
	'activo' => $postData['activo'],
	'categoria' => $postData['id_categoria'],
	'unidad' => $postData['id_unidad'],
	'id_producto' => $postData['id_producto']
]);

if($exito) {
	$salida = [
		'status' => 1,
		'data' => [
			'id_producto' 	=> $db->lastInsertId(),
			'producto' 		=> $postData['producto'],
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