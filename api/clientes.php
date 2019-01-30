<?php require_once 'conexion.php';

$query = "SELECT p.id_pedido, u.id_usuario, u.nombre, u.apellido, ep.estado 
FROM pedidos AS p
INNER JOIN clientes AS c
ON p.CLIENTES_fk_usuario = c.fk_usuario
INNER JOIN usuarios AS u 
ON c.fk_usuario = u.id_usuario
INNER JOIN estados_pedidos AS ep
ON p.ESTADO_PEDIDO_id_estado = ep.id_estado 

WHERE HUERTAS_id_huerta = '1' AND ep.estado IN ('pendiente de pago','pendiente de entrega')
GROUP BY id_usuario";

$stmt = $db->prepare($query);

$stmt->execute();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));