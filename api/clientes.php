<?php require_once 'conexion.php';

$query = "SELECT p.id_pedido, p.HUERTAS_id_huerta, u.nombre, u.id_usuario FROM pedidos AS p
INNER JOIN clientes AS c ON p.CLIENTES_fk_usuario = c.fk_usuario 
INNER JOIN usuarios AS u ON u.id_usuario = p.CLIENTES_fk_usuario
INNER JOIN huertas AS h ON p.HUERTAS_id_huerta = h.id_huerta
INNER JOIN usuarios AS vendedor ON vendedor.id_usuario = h.USUARIOS_id_usuario
WHERE vendedor.id_usuario = ?
GROUP BY id_usuario";

$stmt = $db->prepare($query);

$stmt->execute([$_GET['id']]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));