const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hywij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&serverSelectionTimeoutMS=5000`
    );
    
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
