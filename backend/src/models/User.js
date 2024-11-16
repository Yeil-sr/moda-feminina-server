const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: Object,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
