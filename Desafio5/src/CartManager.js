const fs = require("fs");

class CartManager {
  constructor() {
    this.path = "../files/cart.json";
    this.readFromFile();
    this.file = [];
  }

  readFromFile() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf8");
      this.file = JSON.parse(data);
    }
  }

  saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.file), "utf8");
  }

  //metodo para crear un nuevo carrito
  createCart() {
    this.readFromFile();
    const cart = {
      id: this.file.carts.length + 1,
      products: [],
    };
    this.file.carts.push(cart);
    this.saveToFile();
    return cart;
  }

  //metodo para obtener un carrito por id
  getCartById(id) {
    this.readFromFile();
    const cart = this.file.carts.find((cart) => cart.id === id);
    if (!cart) {
      console.log("No existe el carrito");
      return;
    }
    return cart;
  }

  //metodo para agregar un producto a un carrito por id
  addProductToCart(id, product) {
    this.readFromFile();
    const cart = this.file.carts.find((cart) => cart.id === id);
    if (!cart) {
      console.log("No existe el carrito");
      return;
    }
    cart.products.push(product);
    this.saveToFile();
  }
}

module.exports = CartManager;
