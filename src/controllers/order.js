const { Order, Items, sequelize } = require('../models');

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

// Função para criar uma nova Order com Items
async function createOrder(req, res) {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    try {
        // Cria uma transação para garantir a consistência dos dados
        await sequelize.transaction(async (transaction) => {
            // Cria a Order
            const order = await Order.create({
                numeroPedido,
                valorTotal,
                dataCriacao
            }, { transaction });

            // Cria os Items associados à Order
            await Promise.all(items.map(async (item) => {
                await Items.create({
                    orderId: numeroPedido,
                    idItem: item.idItem,
                    quantidadeItem: item.quantidadeItem,
                    valorItem: item.valorItem
                }, { transaction });
            }));

            // Envie a resposta ao cliente apenas uma vez, depois de confirmar a transação
            res.status(201).json({ message: 'Order criada com sucesso!' });
        });
    } catch (error) {
        console.error('Erro ao criar a Order:', error);
        res.status(500).json({ error: 'Erro interno ao criar a Order' });
    }
}


// Rota para consultar uma Order pelo número do pedido
async function getItem(req, res) {
    const { numeroPedido } = req.params;

    try {
        // Busca a Order pelo número do pedido
        const order = await Order.findOne({
            where: { numeroPedido },
            include: Items // Inclui os Items associados à Order na consulta
        });

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao consultar a Order:', error);
        res.status(500).json({ error: 'Erro interno ao consultar a Order' });
    }
}


module.exports = {
    listOrders,
    createOrder,
    getItem,
};
