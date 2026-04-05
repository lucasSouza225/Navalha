const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        console.log(`📦 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error('❌ Erro MongoDB:', error.message);
        throw error;
    }
};

module.exports = connectDB;