require("dotenv").config();
const pool = require("../models/db");
const supabase = require("../utilities/supabaseClient");

// Get all categories
exports.renderCategoryList = async (req, res) => {
  try {
    // Fetch all categories
    const categoriesResult = await pool.query("SELECT * FROM categories ORDER BY id");

    // Fetch count of categories with items
    const categoriesWithItemsResult = await pool.query(
      `SELECT COUNT(DISTINCT category_id) AS count 
       FROM items`
    );

    // Fetch count of active categories
    const activeCategoriesResult = await pool.query(
      `SELECT COUNT(*) AS count 
       FROM categories 
       WHERE id IN (SELECT DISTINCT category_id FROM items)`
    );

    // Pass data to the view
    res.render("categories/list", {
      categories: categoriesResult.rows,
      categoriesWithItems: categoriesWithItemsResult.rows[0].count,
      activeCategories: activeCategoriesResult.rows[0].count,
    });
  } catch (err) {
    res.status(500).render("error", {
      errorMessage: "An error occurred while fetching categories",
      title: "Error",
    });
  }
};


// Render the Create Category Form
exports.renderCreateForm = (req, res) => {
  res.render("categories/create");
};

// Handle Form Submission and Create a new Category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, description }]);

    if (error) throw error;

    res.redirect("/categories");
  } catch (error) {
    res.status(500).render("error", {
      errorMessage: "An error occurred while creating the category",
      title: "Error",
    });
  }
};

// Render the update category form
exports.renderUpdateForm = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.render("categories/update", { category });
  } catch (error) {
    res.status(500).render("error", {
      errorMessage: "Error fetching category",
      title: "Error",
    });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const { error } = await supabase
      .from("categories")
      .update({ name, description })
      .eq("id", id);

    if (error) throw new Error("Error updating category: " + error.message);

    res.redirect("/categories");
  } catch (error) {
    res.status(500).render("error", {
      errorMessage: "Error updating category",
      title: "Error",
    });
  }
};

const CORRECT_PASSCODE = process.env.DELETE_PASSCODE;

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { passcode } = req.body;

    // Verify the passcode
    if (passcode !== CORRECT_PASSCODE) {
      req.flash("errorMessage", "Invalid passcode. Cannot delete category.");
      return res.redirect("/categories");
    }

    // Check if the category has associated items
    const { data: items, error: checkError } = await supabase
      .from("items")
      .select("id")
      .eq("category_id", id);

    if (checkError) {
      throw new Error("Error checking associated items: " + checkError.message);
    }

    if (items.length > 0) {
      req.flash(
        "errorMessage",
        "Cannot delete category: It has associated items."
      );
      return res.redirect("/categories");
    }

    // Proceed with deletion
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw new Error("Error deleting category: " + deleteError.message);
    }

    res.redirect("/categories");
  } catch (error) {
    req.flash("errorMessage", "An unexpected error occurred.");
    res.status(500).render("error", {
      errorMessage: "Error deleting category",
      title: "Error",
    });
  }
};

