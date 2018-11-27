<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$db = new PDO('mysql:host=localhost:3306;dbname=dw6_radiko;charset=utf8', 'root', '');

$buffer = file_get_contents('php://input');

$postData = json_decode($buffer, true);

$query = "INSERT INTO
		usuarios
	SET
		nombre = :nombre,
		email = :email,
		password = :password";

$stmt = $db->prepare($query);

$exito = $stmt->execute([
	'nombre' => $postData['nombre'],
	'email' => $postData['email'],
	'password' => md5($postData['password'])
]);


if($exito) {
	$salida = [
		'status' => 1,
		'data' => [
		'id_usuario' => $db->lastInsertId(),
		'nombre' => $postData['nombre']
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