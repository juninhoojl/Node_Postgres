module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        numeroPedido: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            field: 'orderId'
        },
        valorTotal: {
            type: DataTypes.NUMERIC(15, 2),
            field: 'value'
        },
        dataCriacao: {
            type: DataTypes.DATE,
            field: 'creationDate'
        }
    }, {
        tableName: 'Order',
        timestamps: false
    });

    return Order;
};


