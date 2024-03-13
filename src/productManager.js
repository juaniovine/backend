const fs = require('fs');

class ProductManager {
    // Constructor ahora acepta un parámetro para el nombre del archivo JSON
    constructor(fileName) {
        this.fileName = fileName;
        this.getProducts = this.loadProducts();
    }

    // Cargar productos desde el archivo JSON
    loadProducts() {
        try {
            const data = fs.readFileSync(`./data/${this.fileName}.json`, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retorna un array vacío
            return [];
        }
    }

    // Guardar productos en el archivo JSON
    saveProducts() {
        fs.writeFileSync(`./data/${this.fileName}.json`, JSON.stringify(this.getProducts, null, 2), 'utf8');
    }

    // Método para agregar un producto
    addProduct(data) {
        const newProduct = {
            id: this.getProducts.length === 0 ? 1 : this.getProducts[this.getProducts.length - 1].id + 1,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock || 25,
        };

        this.getProducts.push(newProduct);
        this.saveProducts();
    }

    // Método para leer todos los productos
    read() {
        return this.getProducts;
    }

    // Método para leer un producto por ID
    readOne(id) {
        return this.getProducts.find(product => product.id === Number(id));
    }
}

// Crear la carpeta 'data' si no existe
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Crear una instancia de ProductManager con el nombre del archivo JSON
const productManager = new ProductManager('products');

// Añadir productos
productManager.addProduct({
    title: 'StarWars IV',
    description:'1',
    price: '100',
    thumbnail: 'photoIV',
    code: 'SWMF001',
    stock: 10,
});
productManager.addProduct({
    title: 'StarWars V',
    description:'1',
    price: '100',
    thumbnail: 'photoV',
    code: 'SWMF002',
    stock: 10,
});
productManager.addProduct({
    title: 'StarWars VI',
    description:'1',
    price: '100',
    thumbnail: 'photoVI',
    code: 'SWMF003',
    stock: 10,
});

// Mostrar todos los productos
console.log(productManager.read());

// Mostrar un producto por ID
console.log(productManager.readOne(2));
