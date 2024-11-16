const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsInsecure: true, // Força conexões TLS
    });
        
    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o MongoDB");
    });

    connection.once("open", () => {
        console.log("Conectado ao MongoDB com sucesso!");
    });
};

connect();

module.exports = mongoose;
