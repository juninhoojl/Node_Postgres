module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items', {
        orderId: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            field: 'orderId'
        },
        idItem: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            field: 'productId'
        },
        quantidadeItem: {
            type: DataTypes.INTEGER,
            field: 'quantity'
        },
        valorItem: {
            type: DataTypes.NUMERIC(15, 2),
            field: 'price'
        }
    }, {
        tableName: 'Items',
        timestamps: false
    });

    return Items;
};
