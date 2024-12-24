const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

// List items by category
router.get("/", itemsController.listItems);
router.get("/create", itemsController.renderCreateForm);
router.post("/", itemsController.createItem);
router.get("/:id/edit", itemsController.renderUpdateForm);
router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
