// /src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/order');
const sequelize = require('./models/index').sequelize;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configuração das rotas
app.use('/', orderRoutes);

// Sincroniza o Sequelize com o banco de dados e inicia o servidor
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
});