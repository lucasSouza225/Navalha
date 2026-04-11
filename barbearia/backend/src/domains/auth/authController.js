import Barbeiro from "./Barbeiro.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log("✅ Controller de autenticação carregado");

const bcryptSalt = bcrypt.genSaltSync(10);

export const cadastrar = async (req, res) => {
  console.log("📝 Função cadastrar chamada"); 
  try {
    const { nome, email, senha, telefone } = req.body;
    console.log("Dados recebidos:", { nome, email, telefone }); 
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        message: "Nome, email e senha são obrigatórios" 
      });
    }

    const barbeiroExistente = await Barbeiro.findOne({ email });
    if (barbeiroExistente) {
      return res.status(400).json({ 
        message: "Email já cadastrado" 
      });
    }

    const senhaCriptografada = bcrypt.hashSync(senha, bcryptSalt);

    const novoBarbeiro = await Barbeiro.create({
      nome,
      email,
      senha: senhaCriptografada,
      telefone: telefone || ''
    });

    res.status(201).json({
      _id: novoBarbeiro._id,
      nome: novoBarbeiro.nome,
      email: novoBarbeiro.email,
      message: "Barbeiro cadastrado com sucesso!"
    });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ 
      message: "Erro ao cadastrar barbeiro", 
      error: error.message 
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        message: "Email e senha são obrigatórios" 
      });
    }

    const barbeiro = await Barbeiro.findOne({ email });
    if (!barbeiro) {
      return res.status(401).json({ 
        message: "Email ou senha inválidos" 
      });
    }

    const senhaValida = bcrypt.compareSync(senha, barbeiro.senha);
    if (!senhaValida) {
      return res.status(401).json({ 
        message: "Email ou senha inválidos" 
      });
    }

    const token = jwt.sign(
      { 
        _id: barbeiro._id, 
        nome: barbeiro.nome, 
        email: barbeiro.email 
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    }).json({
      _id: barbeiro._id,
      nome: barbeiro.nome,
      email: barbeiro.email
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ 
      message: "Erro ao fazer login", 
      error: error.message 
    });
  }
};

// VERIFICAR LOGIN (para manter sessão)
export const perfil = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(null);
  }

  try {
    const barbeiroInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.json(barbeiroInfo);
  } catch (error) {
    res.clearCookie("token").json(null);
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logout realizado" });
};