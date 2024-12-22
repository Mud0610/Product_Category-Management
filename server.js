import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import categoryRouter from "./routes/categoryMasterRoutes.js";
import productRouter from "./routes/productMasterRoutes.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/categories", categoryRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.render("welcome");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
