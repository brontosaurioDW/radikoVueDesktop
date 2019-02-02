<?php require_once 'conexion.php';

$query = "SELECT id_producto, producto, marca, precio, stock, p.activo, um.unidad_de_medida FROM productos as p
INNER JOIN unidades_de_medida as um ON p.UNIDADES_DE_MEDIDA_id_unidad_medida = um.id_unidad_medida
INNER JOIN huertas AS h ON p.HUERTAS_id_huerta = h.id_huerta
INNER JOIN usuarios AS vendedor ON vendedor.id_usuario = h.USUARIOS_id_usuario
WHERE vendedor.id_usuario = ? AND p.activo = '1'
ORDER BY p.producto ASC";

$stmt = $db->prepare($query);

$stmt->execute([$_GET['id']]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));