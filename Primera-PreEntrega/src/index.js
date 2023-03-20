const express = require("express");
const cartRouter = require("./routes/cart.router.js");
const productsRouter = require("./routes/products.router.js");

const app = express();
const port = 3000;

//app.use("/api/cart", cartRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
