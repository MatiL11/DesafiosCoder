/* Consigna:
1- Realizar una clase “ProductManager” que gestione un conjunto de productos.
Aspectos a incluir:
- Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
- Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
- Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”*/

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
