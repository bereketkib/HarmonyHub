# HarmonyHub Inventory Management System

![HarmonyHub Banner](/public/images/Logo.png)

HarmonyHub is an elegant inventory management system built using **Node.js**, **Express.js**, and **PostgreSQL** (hosted on **Supabase**). This project enables efficient management of categories and items with CRUD operations and includes secure deletion with a passcode.

## Features

- **Category Management:**
  - List all categories
  - Create, edit, and delete categories (with confirmation and validation)
  - Display active categories and those with items

- **Item Management:**
  - List items with search and category filters
  - Create, edit, and delete items
  - Pagination for large item lists

- **Secure Deletion:**
  - Passcode-protected deletion for categories and items

- **Interactive Frontend:**
  - Dynamic pages rendered with **EJS**
  - Styling with **CSS** and support for public assets

- **Error Handling:**
  - Informative error pages for unexpected issues
  - Flash messages for validation and error feedback

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Supabase for hosting)
- **Templating Engine:** EJS
- **Styling:** Bootstrap CSS combined with custom CSS (with support for public assets)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) installed
- PostgreSQL database or a Supabase account
- A `.env` file with the following variables:
  ```env
  PORT=3000
  DELETE_PASSCODE=your_secure_passcode
  DATABASE_URL=your_database_connection_string
  ```

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/harmonyhub.git
   cd harmonyhub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database:
   - Run the SQL scripts to create the `categories` and `items` tables.
   - Populate initial data if needed.

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
HarmonyHub/
├── controllers/
│   ├── categoriesController.js
│   └── itemsController.js
├── models/
│   └── db.js
├── routes/
│   ├── categoriesRoutes.js
│   └── itemsRoutes.js
├── views/
│   ├── categories/
│   │   ├── list.ejs
│   │   ├── create.ejs
│   │   └── update.ejs
│   ├── items/
│   │   ├── list.ejs
│   │   ├── create.ejs
│   │   └── update.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── error.ejs
├── public/
│   └── css/
│   │   └── styles.css
│   │   └── items.css
│   │   └── categories.css
│   │   └── about-contact.css
│   └── js/
│       └── scripts.js
├── .env
├── app.js
├── package.json
└── README.md

```

## API Endpoints

### Categories
- `GET /categories` - List all categories
- `GET /categories/create` - Render category creation form
- `POST /categories` - Create a new category
- `GET /categories/:id/edit` - Render category edit form
- `PUT /categories/:id` - Update an existing category
- `DELETE /categories/:id` - Delete a category (with passcode)

### Items
- `GET /items` - List all items
- `GET /items/create` - Render item creation form
- `POST /items` - Create a new item
- `GET /items/:id/edit` - Render item edit form
- `PUT /items/:id` - Update an existing item
- `DELETE /items/:id` - Delete an item (with passcode)

## Screenshots

### Home Page
![Home Page](/public/images/home.png)

### Categories Page
![Categories Page](/public/images/categories.png)

### Items Page
![Items Page](/public/images/items.png)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a detailed explanation of your changes.

---

Enjoy using [**HarmonyHub**](https://harmonyhub-y8ot.onrender.com/) and feel free to contribute to its growth!
