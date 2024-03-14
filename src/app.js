// const ProductManager = require('./productManager.js')

import { ProductManager } from './productManager.js';

const PM = new ProductManager(`${__dirname}/products.json`);

PM.loadProductsFromFile();

const addProducts = async () => {
    let result = await PM.addProduct({
        title: "Girasol triturado",
        description: "Paquete girasol triturado x200gr",
        precio: 500,
        thumbnail: img01.img,
        code: "PTR0001",
        stock: 25
    });

    console.log(result)

    result = await PM.addProduct({
        title: "Almendras",
        description: "Paquete de almendras x200gr",
        precio: 3500,
        thumbnail: img02.img,
        code: "PTR0002",
        stock: 50
    });

    console.log(result)

    result = await PM.addProduct({
        title: "Castañas tostadas",
        description: "Paquete castañas tostadas x200gr",
        precio: 3200,
        thumbnail: img03.img,
        code: "PTR0003",
        stock: 40
    });

    console.log(result)

    result = await PM.addProduct({
        title: "Harina Girasol",
        description: "Harina Girasol x500gr",
        precio: 1500,
        thumbnail: img04.img,
        code: "PTR0004",
        stock: 25
    });

    console.log(result)

    console.log(PM.getProducts());    
}

// Guarda productos en un archivo
PM.saveProductsToFile();
