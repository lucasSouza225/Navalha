import { Schema, model } from "mongoose";

const barbeiroSchema = new Schema({
  nome: { 
    type: String, 
    required: [true, "Nome é obrigatório"] 
  },
  email: { 
    type: String, 
    required: [true, "Email é obrigatório"],
    unique: true,
    lowercase: true 
  },
  senha: { 
    type: String, 
    required: [true, "Senha é obrigatória"] 
  },
  telefone: {
    type: String,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default model("Barbeiro", barbeiroSchema);