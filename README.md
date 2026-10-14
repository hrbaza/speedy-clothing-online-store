# Speed Clothing – Online Store

MERN stack e-commerce store (Final Year Project).

| Folder | What it is | Port |
| --- | --- | --- |
| `frontend/` | Customer store (React + Vite + Tailwind) | 5173 |
| `admin/` | Admin panel: add/list products, manage orders | 5174 |
| `backend/` | REST API (Express + MongoDB + Cloudinary) | 5000 |

## Features
- Product catalogue with search, category filters and price sorting
- Cart synced to the user's account, JWT login/register
- Checkout with Cash on Delivery
- Order prices calculated on the server from the database
- Admin panel: upload products with images (Cloudinary), update order status, delete orders

## How to run

**Requirement:** [Node.js](https://nodejs.org) (LTS version) installed once on the computer.

1. Open this folder in VS Code.
2. Open a terminal (**Terminal → New Terminal**) and run:
   ```bash
   npm start
   ```
   Or simply double-click **`START.bat`** in the folder.

The first run installs all libraries automatically (2-5 minutes), then starts everything:

| | URL |
| --- | --- |
| Store | http://localhost:5173 |
| Admin panel | http://localhost:5174 |
| Backend API | http://localhost:5000 |

Press `Ctrl + C` in the terminal to stop.

The `.env` files (database link, keys, admin login) must be present in `backend/`, `frontend/` and `admin/`.
They are not on GitHub; if they are missing, copy each `.env.example` to `.env` and fill in the values.
