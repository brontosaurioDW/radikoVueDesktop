<?php require_once 'conexion.php';

$query = "SELECT * FROM huertas
		WHERE id_huerta = ?";

$stmt = $db->prepare($query);

$stmt->execute([$_GET['id']]);

echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));