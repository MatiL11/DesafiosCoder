const { Router } = require("express");
const CartManager = require("../../class/CartManager.js");
const cm = new CartManager();
const router = Router();

//creo un nuevo carrito vacio
router.post("/", (req, res) => {
  try {
    const cart = cm.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: "El carrito no se ha guardado" });
  }
});

//obtengo un carrito por id
router.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  try {
    const cart = cm.getCartById(cartId);
    res.status(200).send({ message: cart });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "El carrito no fue encontrado" });
  }
});

//agrego un producto a un carrito por id
router.post("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
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
    const cart = cm.addProductToCart(cartId, product);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: "El producto no se ha guardado" });
  }
});

module.exports = router;
