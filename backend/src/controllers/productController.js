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

// Função auxiliar para buscar produtos por categorias e limitar a quantidade
const fetchProductsByCategories = async (categories, limit) => {
    try {
        // Buscar produtos de múltiplas categorias
        const products = await Product.find({ category: { $in: categories } });
        // Misturar os produtos aleatoriamente
        const shuffledProducts = products.sort(() => Math.random() - 0.5);
        // Retornar os primeiros "limit" produtos
        return shuffledProducts.slice(0, limit);
    } catch (error) {
        console.error("Error fetching products by categories:", error);
        throw error;
    }
};

exports.getnewCollections = async (req, res) => {
    try {
        // Categorias para novas coleções
        const categories = ["lingerie", "sutiã", "calcinha"];
        const limit = 4; // Número de produtos a serem exibidos
        const newCollections = await fetchProductsByCategories(categories, limit);

        console.log("New collections fetched successfully");
        res.json({ success: true, products: newCollections });
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
        // Categorias para produtos populares
        const categories = ["lingerie", "sutiã", "calcinha"];
        const limit = 4; // Número de produtos a serem exibidos
        const popularProducts = await fetchProductsByCategories(categories, limit);

        console.log("Popular products fetched successfully");
        res.json({ success: true, products: popularProducts });
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching popular products",
            error,
        });
    }
};