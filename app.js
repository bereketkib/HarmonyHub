const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const categoriesRoutes = require("./routes/categoriesRoutes");
const itemsRoutes = require("./routes/itemsRoutes");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

// Routes
app.use("/categories", categoriesRoutes);
app.use("/items", itemsRoutes);

// Default route
app.get("/", (req, res) => {
  res.render("index", { title: "HarmonyHub" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

app.use((err, req, res, next) => {
  res.status(500).render("error", {
    errorMessage: "Something went wrong. Please try again later.",
    title: "Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
