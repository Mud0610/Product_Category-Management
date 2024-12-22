import pool from "../model/db.js";

const displayProducts = async (req, res) => {
  try {
    const result = await pool.query(`
                SELECT products.id, products.name, products.price, 
                       categories.name AS category_name, products.category_id
                FROM products
                INNER JOIN categories ON products.category_id = categories.id 
                `);

    res.render("products/index", { products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addProductFrom = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    res.render("products/add", { categories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addNewProduct = async (req, res) => {
  const { name, price, category_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3)",
      [name, price, category_id]
    );
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const editProductFrom = async (req, res) => {
  const { id } = req.params;
  try {
    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    const categoryResult = await pool.query(
      "SELECT * FROM categories ORDER BY id"
    );
    res.render("products/edit", {
      product: productResult.rows[0],
      categories: categoryResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4",
      [name, price, category_id, id]
    );
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default {
  displayProducts,
  addProductFrom,
  addNewProduct,
  editProductFrom,
  updateProduct,
  deleteProduct,
};
