const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// Routes for categories
router.get("/", categoriesController.renderCategoryList);
router.get("/create", categoriesController.renderCreateForm);
router.post("/", categoriesController.createCategory);
router.get("/:id/edit", categoriesController.renderUpdateForm);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
