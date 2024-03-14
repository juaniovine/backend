const fs = require('fs')
class ProductManager {
    
    constructor() {
      this.products = []; 
      this.productIdCounter = 1;
    }
  
    getProducts() {
      return this.products; 
    }
  
    addProduct(title, description, precio, thumbnail, code, stock) {
        // Validación de campos obligatorios
        if (!title || !description || !precio || !thumbnail || !code || !stock) {
          return console.error('Todos los campos son obligatorios');
        }
        
        // Validación de campo code único
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
          return console.error('El código del producto ya existe');
        }
        
        const product = {
          id: this.productIdCounter++,
          title,
          description,
          precio,
          thumbnail,
          code,
          stock: typeof stock !== 'undefined' ? stock : 20,
        };
  
      this.products.push(product);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        
        if (!product) {
          return console.error('Producto no encontrado');
        }
        return product;
    }
}
  
const PM = new ProductManager();
console.log(PM.getProducts());  
  
PM.addProduct('1','Girasol triturado','Girasol triturado x200gr', 500,'X','PTR0001',20);
  
console.log(PM.getProducts());
console.log(PM.getProductById(1));