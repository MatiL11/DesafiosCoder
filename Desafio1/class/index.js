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

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (this.products.find((p) => p.code === product.code)) {
      console.log("El producto ya existe");
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Faltan datos");
      return;
    }
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("Not found");
      return;
    }
    return product;
  }
}

module.exports = ProductManager;
