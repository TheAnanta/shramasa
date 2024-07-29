import express from "express";
import cors from "cors";

const app = express();
app.use(cors);
const PORT = 3001;

app.get("/products", (req, res) => {
  console.log("Hi there");
  return res.json({ msg: "hi there" });
});

app.get("/product/:product_id", (req, res) => {
  console.log("Hi there");
  return res.json({ msg: "hi there" });
});

app.get("/cart", (req, res) => {
  console.log("Hi there");
  return res.json({ msg: "hi there" });
});

app.get("/wishlist", (req, res) => {
  console.log("Hi there");
  return res.json({ msg: "hi there" });
});

app.get("/orders/:order_id", (req, res) => {
  console.log("Hi there");
  return res.json({ msg: "hi there" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
