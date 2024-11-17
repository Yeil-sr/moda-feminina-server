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

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products", error });
    }
};

const fetchProductsByCategories = async (categories) => {
    // Busca produtos com base nas categorias fornecidas
    const products = await Product.find({ category: { $in: categories } });
    // Embaralha a ordem dos produtos
    return products.sort(() => Math.random() - 0.5);
};

exports.getnewCollections = async (req, res) => {
    try {
        // Busca e mistura produtos das categorias
        const newCollections = await fetchProductsByCategories([
            "sutia",
            "lingerie",
            "calcinha",
        ]);

        // Retorna os primeiros 4 produtos
        res.json({
            success: true,
            products: newCollections.slice(0, 4),
        });
        console.log("New collection fetched successfully");
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching new collections",
            error,
        });
    }
};

exports.popularlingerie = async (req, res) => {
    try {
        // Busca e mistura produtos das categorias
        const popularProducts = await fetchProductsByCategories([
            "sutia",
            "lingerie",
            "calcinha",
        ]);

        // Retorna os primeiros 4 produtos
        res.json({
            success: true,
            products: popularProducts.slice(0, 4),
        });
        console.log("Popular products fetched successfully");
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching popular products",
            error,
        });
    }
};
