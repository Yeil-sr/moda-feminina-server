// controllers/cartController.js
const Users = require("../models/User");

// Adiciona um item ao carrinho
exports.addToCart = async (req, res) => {
    try {
        const userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding item to cart", error });
    }
};

// Remove um item do carrinho
exports.removeFromCart = async (req, res) => {
    try {
        const userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.json({ success: true, message: "Item removed from cart" });
        } else {
            res.status(400).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing item from cart", error });
    }
};

// Retorna os dados do carrinho
exports.getCart = async (req, res) => {
    try {
        const userData = await Users.findOne({ _id: req.user.id });
        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving cart data", error });
    }
};
