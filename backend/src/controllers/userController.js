const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Endpoint para registro de usuário
exports.signup = async (req, res) => {
    try {
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already registered" });
        }

        const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom', { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error signing up", error: error.message });
    }
};

// Endpoint para login de usuário
exports.login = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Email not found" });
        }

        // Verificação da senha
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, error: "Incorrect password" });
        }

        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom', { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in", error: error.message });
    }
};
