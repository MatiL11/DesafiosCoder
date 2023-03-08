/*Consigna
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

Aspectos a incluir

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados

ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.*/


const express = require("express");
const ProductManager = require("../class/ProductManager.js");
const productManager = new ProductManager();

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  //console.log("limit ->", limit);
  const products = await productManager.getProducts(limit);
  const productsLimit = limit ? products.products.slice(0, limit) : products;
  res.json(productsLimit);
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  //console.log("pid ->", pid);
  const product = await productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
