<?php
require 'token-functions.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$db = new PDO('mysql:host=localhost:3306;dbname=dw6_radiko;charset=utf8', 'root', '');

$input = file_get_contents('php://input');
$postData = json_decode($input, true);

$query = "SELECT * FROM usuarios
		WHERE email = :email
		AND password = :password";

$stmt = $db->prepare($query);

$stmt->execute([
	'email' 	=> $postData['email'],
	'password' 	=> $postData['password'],
]);

if($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$token = generateToken($fila['id_usuario']);

	setcookie('token', $token, 0, "", "", false, true);

	echo json_encode([
		'status' => 1,
		'message' => 'Sesión iniciada.',
		'data' => [
			'nombre' => $fila['nombre'],
			'email' => $fila['email'],
		]
	]);
} else {
	echo json_encode([
		'status' => 0,
		'message' => 'Usuario y/o password incorrectos.'
	]);
}