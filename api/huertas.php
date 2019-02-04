<?php require_once 'conexion.php';

$query = "SELECT p.id_pedido, h.nombre_huerta, h.foto_huerta, h.id_huerta, u.id_usuario, p.CLIENTES_fk_usuario FROM pedidos AS p
INNER JOIN huertas AS h ON p.HUERTAS_id_huerta = h.id_huerta 
INNER JOIN usuarios as u ON u.id_usuario = p.CLIENTES_fk_usuario
WHERE CLIENTES_fk_usuario = ?
GROUP BY id_huerta";

$stmt = $db->prepare($query);

$stmt->execute([$_GET['id']]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));