const ProductManager = require("./class");
const producto = new ProductManager();

producto.addProduct({
  title: "Producto 1",
  description: "Este es un producto de prueba 1",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
});
producto.addProduct({
  title: "Producto 2",
  description: "Este es un producto de prueba 2",
  price: 300,
  thumbnail: "Sin Imagen",
  code: "abc1234",
  stock: 25,
});

console.log(producto.getProducts());

producto.addProduct({
  title: "Producto de prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
});

producto.getProductById(2);
console.log(producto.getProductById(2));
