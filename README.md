
# 🛍️ Next-Shop • E-Commerce Store

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


A fully responsive **E-Commerce web application** built with **Next.js 16 (App Router)**, **React**, **TypeScript**, and **Material UI**.

Products were originally fetched from **FakeStoreAPI**, but to ensure stable production builds on Vercel, all product objects were copied into a local file (`lib/productsData.ts`).  
This makes the app fast, reliable, and deployment-safe.

---

## 🚀 Live Demo

🔗 **Vercel Deployment:** https://nextjs-ecommerce-store-psi.vercel.app/

---

## ⭐ Features

### 🛍 Product Catalog
- Fully responsive product grid (desktop → tablet → mobile)
- Product cards with images, price, and short description
- “View” and “Add to Cart” actions
- Clean layout using MUI Grid + Card components

### 🛒 Shopping Cart
- Global cart state using **React Context + useReducer**
- Add / remove items
- Increment / decrement item quantities
- Automatic total calculation
- Snackbar notifications for cart actions

### 📦 Local Product Data (No API Dependency)
- Products are stored locally in `productsData.ts`
- Zero risk of API downtime or deployment errors

### 🎨 UI & Styling
- Clean, modern interface using **Material UI**
- Custom button colors and hover states
- Tailwind installed but minimally used (MUI handled all layout & styling)
- Responsive spacing & typography

### 📱 Fully Responsive Layout
- Product cards stack beautifully on mobile
- Cart page adapts to all screen sizes
- Flexible MUI Grid system

---

## 🧰 Tech Stack

| Category | Technologies |
|---------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | Material UI (MUI) |
| **State Management** | React Context + useReducer |
| **Data** | Local FakeStoreAPI dataset |
| **Deployment** | Vercel |

---

## 🧩 What I Learned

- How to structure an e-commerce UI with reusable React components  
- Managing global state using React Context + useReducer  
- Working with TypeScript in the App Router  
- Designing responsive layouts with Material UI  
- Preparing an app for production deployment on Vercel  
- Avoiding deployment errors by replacing external API calls with a local dataset


---

## 🧠 Implementation Details

### 🛒 Cart Logic
The cart uses:
- **`useReducer`** for predictable state transitions  
- A strict **Action union type**  
- Cases: `ADD`, `REMOVE`, `INCREMENT`, `DECREMENT`, `CLEAR`  
- Immutable updates  
- Automatic total calculation on render  

### 📦 Reliable Product Loading
Instead of calling Fakestore API:

```ts
import { productsData } from "@/lib/productsData";

