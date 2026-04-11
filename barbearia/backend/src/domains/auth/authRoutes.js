// backend/src/domains/auth/authRoutes.js
import { Router } from "express";
import { cadastrar, login, perfil, logout } from "./authController.js";

const router = Router();

console.log("✅ Rotas de autenticação carregadas"); 

router.post("/cadastrar", cadastrar);
router.post("/login", login);
router.get("/perfil", perfil);
router.post("/logout", logout);

export default router;