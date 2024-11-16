// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const fetchUser = require("../middleware/fetchUser"); // Criar e adicionar o middleware fetchUser em uma pasta separada

// Rota para adicionar ao carrinho
router.post("/add", fetchUser, cartController.addToCart);

// Rota para remover do carrinho
router.post("/remove", fetchUser, cartController.removeFromCart);

// Rota para obter dados do carrinho
router.get("/getcart", fetchUser, cartController.getCart);

module.exports = router;
