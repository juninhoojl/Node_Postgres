const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Rota para listar todos os Pedidos
router.get('/order/list', orderController.listOrders);

// Rota para consultar um Pedido pelo numeroPedido
router.get('/order/:numeroPedido', orderController.getItem);

// Rota para criar um novo Pedido
router.post('/order', orderController.createOrder);

// Rota para consultar um Pedido pelo numeroPedido
router.delete('/order/:numeroPedido', orderController.deleteItem);

// Rota para consultar um Pedido pelo numeroPedido
router.put('/order/:numeroPedido', orderController.updateItem);

module.exports = router;