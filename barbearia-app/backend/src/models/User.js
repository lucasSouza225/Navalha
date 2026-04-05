const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['cliente', 'barbeiro'],
        default: 'cliente'
    }
}, {
    timestamps: true
});

// ✅ Criptografar senha antes de salvar (SEM next)
UserSchema.pre('save', async function () {
    // Só criptografa se a senha foi modificada
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// ✅ Método para comparar senha
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);