const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "../files/productos.json";
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
