// /src/controllers/orderController.js
const db = require('../models');
const Order = db.Order;
const Items = db.Items;

// Função para listar todas os Pedidos
async function listOrders(req, res) {
    try {
        const orders = await Order.findAll({
            include: Items
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao listar os Pedidos:', error);
        res.status(500).json({ error: 'Erro interno ao listar os Pedidos' });
    }
}

module.exports = {
    listOrders
    // Outras funções de controle aqui
};
