const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar conexão e rotas
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Barbearia Corte & Estilo 🎯',
        status: 'online'
    });
});

// Rotas da API
app.use('/api/auth', authRoutes);

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).send('Rota não encontrada')
})

// Iniciar servidor
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📡 http://localhost:${PORT}\n`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar:', error.message);
        process.exit(1);
    }
};

startServer();