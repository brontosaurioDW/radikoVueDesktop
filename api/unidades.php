<?php require_once 'conexion.php';

$query = "SELECT * FROM unidades_de_medida";

$stmt = $db->prepare($query);

$stmt->execute();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));