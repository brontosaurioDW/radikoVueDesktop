<?php require_once 'conexion.php';
require 'token-functions.php';

$input = file_get_contents('php://input');
$postData = json_decode($input, true);

$query = "SELECT * FROM usuarios
WHERE email = :email
AND password = :password";

$stmt = $db->prepare($query);

$stmt->execute([
	'email' 	=> $postData['email'],
	'password' 	=> md5($postData['password']),
]);

if($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$token = generateToken($fila['id_usuario']);

	echo json_encode([
		'status' 	=> 1,
		'message'	=> 'Sesión iniciada.',
		'data' 		=> [
			'nombre' 	 => $fila['nombre'],
			'email' 	 => $fila['email'],
			'id_usuario' => $fila['id_usuario'],
			'tipo_de_usuario' => $fila['tipo_de_usuario'],
			'token' 	 => '' . $token
		]
	]);
} else {
	echo json_encode([
		'status' => 0,
		'message' => 'Usuario y/o password incorrectos.'
	]);
}