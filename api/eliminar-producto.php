<?php require_once 'conexion.php';

$buffer = file_get_contents('php://input');
$postData = json_decode($buffer, true);

$query = "UPDATE 
productos 
SET
activo = '0'
WHERE
id_producto = :id_producto";

$stmt = $db->prepare($query);

$exito = $stmt->execute([
	'id_producto' => $postData['id_producto']
]);

if($exito) {
	$salida = [
		'status' => 1,
		'data' => [
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