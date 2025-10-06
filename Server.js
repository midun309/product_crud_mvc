const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Product CRUD API (MVC Pattern)");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
