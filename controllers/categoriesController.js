const pool = require("../models/db");
const supabase = require("../utilities/supabaseClient");

// Get all categories
exports.renderCategoryList = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    res.render("categories/list", { categories: result.rows });
  } catch (err) {
    res.status(500).render("error", {
      errorMessage: "An error occured while fetching categories",
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

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category has associated items
    const { data: items, error: checkError } = await supabase
      .from("items")
      .select("id")
      .eq("category_id", id);

    if (checkError) {
      throw new Error("Error checking associated items: " + checkError.message);
    }

    if (items.length > 0) {
      // If there are associated items, set flash message
      req.flash(
        "errorMessage",
        "Cannot delete category: It has associated items."
      );
      return res.redirect("/categories");
    }

    // Proceed with deletion if no associated items
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
