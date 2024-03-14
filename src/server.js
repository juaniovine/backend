import express from 'express';
import { ProductManager } from './productManager.js';
// const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;

const PM = new ProductManager(`${__dirname}/productos.json`);
PM.loadProductsFromFile();

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  const products = PM.getProducts();
  res.json(products);
});

// Ruta para obtener producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = PM.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para actualizar un producto por ID
app.put('/products/:id', express.json(), (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProductData = req.body;
  PM.updateProduct(productId, updatedProductData);
  res.json({ message: 'Producto actualizado correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
