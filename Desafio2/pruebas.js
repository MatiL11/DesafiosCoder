const ProductManager = require("./ProductManager.js");
const producto = new ProductManager();

// producto.addProduct({
//   title: "Producto 1",
//   description: "Descripcion 1",
//   price: 100,
//   thumbnail: "Foto 1",
//   code: 1,
//   stock: 10,
// });
// producto.addProduct({
//   title: "Producto 2",
//   description: "Descripcion 2",
//   price: 200,
//   thumbnail: "Foto 2",
//   code: "abcd1234",
//   stock: 20,
// });
producto.addProduct({
  title: "Producto 4",
  description: "Descripcion 3",
  price: 300,
  thumbnail: "Foto 3",
  code: "abcd1234",
  stock: 30,
});

//console.log(producto.getProducts());
//producto.getProductById();
//console.log(producto.getProductById(3));
//producto.updateProduct(1, { title: "Pastelito" });
//producto.deleteProduct(1);
