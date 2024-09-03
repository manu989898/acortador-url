import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta para acortar una URL
app.post('/shorten', async (req, res) => {
    // Extraer la URL original del cuerpo de la petición
    const { originalUrl } = req.body;
    try {
        // Hacer una petición a la API de is.gd para acortar la URL
        const response = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(originalUrl)}`);
        // Extraer la URL corta de la respuesta
        const shortUrl = await response.text();
        // Enviar la URL corta como respuesta
        res.json({ originalUrl, shortUrl });
    } catch (error) {
        res.status(500).json('Error shortening the URL');
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
