const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis ambiente
dotenv.config();

// Importar conexão e rotas
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Barbearia Corte & Estilo 🎯',
        version: '1.0.0'
    });
});

// Tratamento de erros 404 - CORRIGIDO (removido o *)
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Servidor rodando na porta ${PORT}`);
            console.log(`📡 http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro fatal:', error.message);
        process.exit(1);
    }
};

startServer();