// const fs = require("fs"); 
import fs from "fs";
export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
  }

  loadProductsFromFile() {
    try {
      const dataProducts = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(dataProducts);

      if (this.products.length > 0) {
        const lastProductId = this.products[this.products.length - 1].id;
        this.productIdCounter = lastProductId + 1;
      }
    } catch (err) {
      console.error("Error al cargar los productos desde el archivo:", err);
      return [];
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, "\t");
      fs.writeFileSync(this.path, data);
      console.log("Productos guardados en el archivo:", this.path);
    } catch (err) {
      console.error("Error al guardar los productos en el archivo:", err);
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, "\t");
      fs.writeFileSync(this.path, data);
      console.log("Productos guardados en el archivo:", this.path);
    } catch (err) {
      console.error("Error al guardar los productos en el archivo:", err);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return "Producto no encontrado";
    }
    return product;
  }

  addProduct(title, description, precio, thumbnail, code, stock) {
    const product = {
      id: this.productIdCounter++,
      title,
      description,
      precio,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    return product;
  }

  updateProduct(id, updatedProductData) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProductData };
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}

const PM = new ProductManager("products.json");
console.log(PM.getProducts());

PM.updateProduct(1, { description: "Paquete girasol triturado x200gr" });

console.log(PM.getProducts());
console.log(PM.getProductById(1));
