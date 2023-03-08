/*Consigna

Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

Aspectos a incluir

La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

Debe guardar objetos con el siguiente formato:
id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 

Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.*/

// const fs = require("fs");

// class ProductManager {
//   constructor() {
//     this.path = "./products.JSON";
//     this.products = [];
//     this.readFromFile();
//     this.currentId =
//       this.products.length > 0
//         ? this.products[this.products.length - 1].id + 1
//         : 1;
//   }

//   readFromFile() {
//     if (fs.existsSync(this.path)) {
//       const data = fs.readFileSync(this.path, "utf8");
//       this.products = JSON.parse(data);
//     }
//   }

//   saveToFile() {
//     fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
//   }

//   addProduct(product) {
//     const newProduct = {
//       id: this.currentId,
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       thumbnail: product.thumbnail,
//       code: product.code,
//       stock: product.stock,
//     };
//     this.products.push(newProduct);
//     this.currentId++;
//     this.saveToFile();
//     return newProduct;
//   }

//   getProducts() {
//     this.readFromFile();
//     return this.products;
//   }

//   getProductById(id) {
//     this.readFromFile();
//     return this.products.find((product) => product.id === id);
//   }

//   updateProduct(id, updatedFields) {
//     this.readFromFile();
//     const index = this.products.findIndex((product) => product.id === id);
//     if (index !== -1) {
//       this.products[index] = { ...this.products[index], ...updatedFields };
//       this.saveToFile();
//       return this.products[index];
//     }
//   }

//   deleteProduct(id) {
//     this.readFromFile();
//     const index = this.products.findIndex((product) => product.id === id);
//     if (index !== -1) {
//       const deletedProduct = this.products.splice(index, 1)[0];
//       this.saveToFile();
//       return deletedProduct;
//     }
//   }
// }

const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.JSON";
    this.file = [];
    this.readFromFile();
  }

  readFromFile() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf8");
      //console.log("data-> ", data);
      this.file = JSON.parse(data);
      //console.log("this.products-> ", this.products.products);
    }
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.file), "utf8");
  }

  addProduct(product) {
    this.readFromFile();
    product.id = this.file.products.length + 1;
    this.file.products.push(product);
    this.saveToFile();
  }

  getProducts() {
    this.readFromFile();
    return this.file;
  }

  getProductById(id) {
    this.readFromFile();
    const item = this.file.products.find((product) => product.id === id);
    if (!item) {
      console.log("No existe el producto");
      return;
    }
    return item;
  }

  updateProduct(id, fieldsToUpdate) {
    this.readFromFile();
    const product = this.file.products.find((product) => product.id === id);
    if (product) {
      Object.assign(product, fieldsToUpdate);
      this.saveToFile();
    }
  }

  deleteProduct(id) {
    this.readFromFile();
    this.file = this.file.products.filter((product) => product.id !== id);
    this.saveToFile();
  }
}

module.exports = ProductManager;
