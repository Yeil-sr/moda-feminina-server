const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.memoryStorage(); // Usar armazenamento na memória
const upload = multer({ storage: storage });

// Define a rota de upload
router.post('/upload', upload.single('product'), uploadController.uploadImage);

module.exports = router;
