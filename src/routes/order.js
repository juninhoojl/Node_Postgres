const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Rota para listar todos os Pedidos
router.get('/list', orderController.listOrders);

// Rota para criar uma nova Order com Items
router.post('', orderController.createOrder);

module.exports = router;