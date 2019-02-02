<?php require_once 'conexion.php';

$query = "SELECT nombre_huerta, USUARIOS_id_usuario, foto_huerta FROM huertas as h
INNER JOIN usuarios AS vendedor ON vendedor.id_usuario = h.USUARIOS_id_usuario
WHERE h.USUARIOS_id_usuario = ?";

$stmt = $db->prepare($query);
$stmt->execute([$_GET['id']]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));