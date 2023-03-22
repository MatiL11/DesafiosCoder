const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars");
const ProductManager = require("./productManager.js");
const productManager = new ProductManager();
const routerProducts = require("./routes/products.router.js")(io);
const routerCart = require("./routes/cart.router.js");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");

app.use(express.json());
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

io.on("connection", (socket) => {
  socket.on("productos", () => {
    socket.emit("productos", productManager.getProducts());
  });
});

http.listen(port, () => {
  console.log(`server running at port ${port}`);
});
