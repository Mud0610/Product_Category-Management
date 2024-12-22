import pool from "../model/db.js";

const getAllCategory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    res.render("categories/index", { categories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addNewCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getFormToAdd = (req, res) => {
  res.render("categories/add");
};

const editCategoryWithId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    res.render("categories/edit", { category: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default {
  getAllCategory,
  addNewCategory,
  getFormToAdd,
  editCategoryWithId,
  updateCategory,
  deleteCategory,
};
