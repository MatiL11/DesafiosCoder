const { Router } = require("express");
const ProductManager = require("../ProductManager.js");
const pm = new ProductManager();
const router = Router();

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const productos = pm.getProducts(limit);
    res.status(200).send({ message: productos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Se produjo un error al cargar los productos" });
  }
});

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = pm.getProductById(productId);
    res.status(200).send({ message: product });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "El producto no fue encontrado" });
  }
});

router.post("/", (req, res) => {
  const { title, description, code, price, stock, category } = req.body;

  const product = {
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
  };

  try {
    const savedProduct = pm.addProduct(product);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "El producto no se ha guardado" });
  }
});

router.put("/:pid", (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;
  const productId = parseInt(req.params.pid);

  try {
    const product = pm.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.status = status || product.status;
    product.stock = stock || product.stock;
    product.category = category || product.category;

    const updatedProduct = product.pm.saveToFile();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "No se puedo actualizar el producto" });
  }
});

router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    pm.deleteProduct(productId);
    res.status(200).send({
      message: `Se ha eliminado el producto con id ${productId} correctamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: `Ocurrio un error al eliminar el producto con id ${productId}`,
    });
  }
});

module.exports = router;
