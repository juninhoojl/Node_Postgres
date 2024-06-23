const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Order = require('./order')(sequelize, Sequelize.DataTypes);
db.Items = require('./items')(sequelize, Sequelize.DataTypes);

db.Order.hasMany(db.Items, { foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Items.belongsTo(db.Order, { foreignKey: 'orderId' });

module.exports = db;