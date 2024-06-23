const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Rota para listar todos os Pedidos
router.get('/order/list', orderController.listOrders);

// Rota para consultar um Pedido pelo numeroPedido
router.get('/order/:numeroPedido', orderController.getItem);

// Rota para criar um novo Pedido
router.post('/order', orderController.createOrder);

module.exports = router;