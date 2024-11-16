// app.js
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send('Servidor rodando')
})
// Configuração de rotas
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes); 
app.use("/images", express.static("upload/images"));
app.use("/uploads", uploadRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Server error, please try again later.' });
});

module.exports = app;
