<?php require_once 'conexion.php';

$query = "SELECT 
id_producto,
producto,
marca,
precio,
stock,
activo,
unidad_de_medida
FROM productos as p
INNER JOIN unidades_de_medida as um
ON p.UNIDADES_DE_MEDIDA_id_unidad_medida = um.id_unidad_medida
WHERE HUERTAS_id_huerta = '1' AND p.activo = '1'
ORDER BY p.producto ASC";

$stmt = $db->prepare($query);
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));