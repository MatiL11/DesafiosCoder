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
