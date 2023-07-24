const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this.generateId(products);
    products.push(product);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const productsData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(productsData);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    console.log(products.find((product) => product.id === id))
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const product = products.find((product) => product.id === id);
    if (product) {
      Object.assign(product, updatedFields);
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    this.saveProducts(filteredProducts);
  }

  generateId(products) {
    if (products.length === 0) {
      return 1;
    }
    const lastProduct = products[products.length - 1];
    return lastProduct.id + 1;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports= ProductManager;
