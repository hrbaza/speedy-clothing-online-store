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

## Setup
1. Install dependencies:
   ```bash
   npm install
   npm --prefix backend install
   npm --prefix frontend install
   npm --prefix admin install
   ```
2. Copy each `.env.example` to `.env` (in `backend/`, `frontend/`, `admin/`) and fill in the values.
3. Run everything together:
   ```bash
   npm run dev
   ```
