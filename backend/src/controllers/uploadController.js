const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Configurar o cliente do Google Cloud Storage
const storage = new Storage({
    keyFilename: path.resolve(__dirname, '../key.json'), // Caminho relativo ao backend
});

const bucketName = 'moda-imagens';
const bucket = storage.bucket(bucketName);

// Função para fazer upload para o Google Cloud Storage usando buffers
const uploadBufferToGCS = (buffer, destination, mimetype) => {
    return new Promise((resolve, reject) => {
        const file = bucket.file(destination);
        const stream = file.createWriteStream({
            metadata: {
                contentType: mimetype,
            },
            timeout: 60000, // 60 segundos
        });

        stream.on('error', (err) => reject(err));
        stream.on('finish', () => {
            resolve(`https://storage.googleapis.com/${bucketName}/${destination}`);
        });

        stream.end(buffer);
    });
};

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const destination = `images/${Date.now()}_${req.file.originalname}`;

    try {
        const imageUrl = await uploadBufferToGCS(req.file.buffer, destination, req.file.mimetype);
        res.json({
            success: 1,
            image_url: imageUrl,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: 0, message: 'Upload failed' });
    }
};
