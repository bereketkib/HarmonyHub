const supabase = require("../utilities/supabaseclient");

exports.listItems = async (req, res) => {
  try {
    const { search = "", category = "", page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // Fetch categories for dropdown
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .select("id, name");

    if (categoryError) throw categoryError;

    // Count total items for pagination
    let countQuery = supabase.from("items").select("id", { count: "exact" });
    if (search) {
      countQuery = countQuery.ilike("name", `%${search}%`).or(`description.ilike.%${search}%`);
    }
    if (category) {
      countQuery = countQuery.eq("category_id", category);
    }
    const { count, error: countError } = await countQuery;

    if (countError) throw countError;

    // Fetch items with optional search and category filters
    let query = supabase
      .from("items")
      .select(
        `
        id, name, description, price, quantity, 
        categories (name)
      `
      )
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike("name", `%${search}%`).or(`description.ilike.%${search}%`);
    }
    if (category) {
      query = query.eq("category_id", category);
    }

    const { data: items, error: itemsError } = await query;

    if (itemsError) throw itemsError;

    // Format items with category names
    const formattedItems = items.map((item) => ({
      ...item,
      category_name: item.categories.name,
    }));

    const totalPages = Math.ceil(count / limit);

    res.render("items/list", {
      items: formattedItems,
      categories,
      searchQuery: search,
      selectedCategory: category,
      currentPage: parseInt(page, 10),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).send("An error occurred while fetching items.");
  }
};



// Render the create item form
exports.renderCreateForm = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) throw error;

    res.render("items/create", { categories });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).send("An error occured while rendering the form.");
  }
};

// Handle item creation
exports.createItem = async (req, res) => {
  const { name, description, price, quantity, category_id } = req.body;

  try {
    // Validation: Ensure all fields are filled
    if (!name || !description || !price || !quantity || !category_id) {
      return res.status(400).send("All fields are required.");
    }

    // Insert the new item
    const { error } = await supabase
      .from("items")
      .insert([{ name, description, price, quantity, category_id }]);

    if (error) throw error;

    res.redirect("/items"); // Redirect to the item list
  } catch (error) {
    console.error("Error creating item:", error.message);
    res.status(500).send("An error occurred while creating the item.");
  }
};

exports.renderUpdateForm = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the item by ID
    const { data: item, error: itemError } = await supabase
      .from("items")
      .select("*")
      .eq("id", id)
      .single();

    if (itemError || !item) throw new Error("Item not found.");

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name");

    if (categoriesError) throw categoriesError;

    // Render the update form
    res.render("items/update", { item, categories });
  } catch (error) {
    console.error("Error rendering update form:", error.message);
    res.status(500).send("An error occurred while rendering the update form.");
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category_id } = req.body;

  try {
    // Update the item in the database
    const { error: updateError } = await supabase
      .from("items")
      .update({
        name,
        description,
        price: parseFloat(price), // Ensure price is stored as a float
        quantity: parseInt(quantity, 10), // Ensure quantity is an integer
        category_id: parseInt(category_id, 10),
      })
      .eq("id", id);

    if (updateError) throw updateError;

    // Redirect back to the items list after successful update
    res.redirect("/items");
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).send("An error occurred while updating the item.");
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the item by ID
    const { error: deleteError } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    // Redirect back to the items list after successful deletion
    res.redirect("/items");
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).send("An error occurred while deleting the item.");
  }
};
