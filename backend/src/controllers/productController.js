const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    if (!req.body.image) {
        return res.status(400).json({ success: false, message: "Image URL is required" });
    }

    try {
        const products = await Product.find().sort({ id: -1 }).limit(1);
        const newId = products.length > 0 ? products[0].id + 1 : 1;

        const product = new Product({
            id: newId,
            name: req.body.name,
            image: req.body.image, // Recebe a URL da imagem
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding product", error });
    }
};


exports.removeProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing product", error });
    }
};

exports.getnewCollections = async (req, res) => {
    try {
        // Obter todos os produtos
        const products = await Product.find({});

        // Misturar os produtos de forma aleatória
        const randomProducts = products.sort(() => Math.random() - 0.5);

        // Selecionar os primeiros 4 produtos
        const newCollection = randomProducts.slice(0, 4);

        console.log("New Collection fetched successfully");
        res.json({ success: true, products: newCollection });
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching new collection",
            error,
        });
    }
};

exports.popularlingerie = async (req, res) => {
    try {
        // Filtrar produtos pelas categorias especificadas
        const lingerieProducts = await Product.find({ category: "lingerie" });
        const sutiaProducts = await Product.find({ category: "sutiã" });
        const calcinhaProducts = await Product.find({ category: "calcinha" });

        // Combinar todos os produtos em um único array
        let combinedProducts = [
            ...lingerieProducts,
            ...sutiaProducts,
            ...calcinhaProducts,
        ];

        // Misturar os produtos de forma aleatória
        combinedProducts = combinedProducts.sort(() => Math.random() - 0.5);

        // Selecionar os primeiros 4 produtos
        const popularItems = combinedProducts.slice(0, 4);

        console.log("Popular products fetched successfully");
        res.json({ success: true, products: popularItems });
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching popular products",
            error,
        });
    }
};
