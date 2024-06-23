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

// Rota para deletar uma Order pelo número do pedido
async function deleteItem(req, res) {
    const { numeroPedido } = req.params;

    try {
        // Inicia uma transação para garantir a consistência dos dados
        await sequelize.transaction(async (transaction) => {
            // Deleta a Order
            const deletedRows = await Order.destroy({
                where: { numeroPedido },
                transaction
            });

            if (deletedRows === 0) {
                throw new Error('Order não encontrada');
            }

            // Deleta todos os Items associados à Order
            await Items.destroy({
                where: { orderId: numeroPedido },
                transaction
            });

            // Não é necessário commitar a transação explicitamente, o Sequelize faz isso automaticamente

            res.status(200).json({ message: 'Order deletada com sucesso!' });
        });
    } catch (error) {
        console.error('Erro ao deletar a Order:', error);
        res.status(500).json({ error: 'Erro interno ao deletar a Order' });
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

// Rota para atualizar uma Order pelo número do pedido
async function updateItem(req, res) {
    const { numeroPedido } = req.params;
    const { valorTotal, dataCriacao, items } = req.body;

    try {
        // Inicia uma transação para garantir a consistência dos dados
        await sequelize.transaction(async (transaction) => {
            // Atualiza a Order
            const [, updatedOrder] = await Order.update({
                valorTotal,
                dataCriacao
            }, {
                where: { numeroPedido },
                returning: true,
                transaction
            });

            if (!updatedOrder) {
                throw new Error('Order não encontrada');
            }

            // Deleta todos os Items associados à Order
            await Items.destroy({
                where: { orderId: numeroPedido },
                transaction
            });

            // Cria os novos Items associados à Order
            await Promise.all(items.map(async (item) => {
                await Items.create({
                    orderId: numeroPedido,
                    idItem: item.idItem,
                    quantidadeItem: item.quantidadeItem,
                    valorItem: item.valorItem
                }, { transaction });
            }));

            // Não é necessário commitar a transação explicitamente, o Sequelize faz isso automaticamente

            res.status(200).json({ message: 'Order atualizada com sucesso!' });
        });
    } catch (error) {
        console.error('Erro ao atualizar a Order:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar a Order' });
    }
}


module.exports = {
    listOrders,
    createOrder,
    getItem,
    deleteItem,
    updateItem,
};
