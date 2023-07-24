const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  let products = await productManager.getProducts();

  if (limit && Array.isArray(products)) {
      products = products.slice(0, limit);
  }

  res.json({ products: products });
});
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await productManager.getProductById(id); 
    if (!product) {
        res.status(404).send('Producto no encontrado');
    } else {
        res.json(product);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
