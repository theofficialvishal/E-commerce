# 🛒 MERN E-Commerce Store

A modern, fully functional E-Commerce web application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS**. This project features secure authentication, an admin dashboard, real-time analytics, caching with Redis, and a seamless checkout experience powered by Stripe.

## ✨ Features

### 🔐 Authentication & Security

- **JWT & Refresh Tokens**: Secure user sessions using JSON Web Tokens.
- **Redis Caching**: Efficient storage and management of refresh tokens for fast validation.
- **Role-Based Access**: Specialized routes and views for `Admin` and `Customer` roles.

### 🛍️ User Experience

- **Responsive UI/UX**: Beautiful, mobile-friendly design built with Tailwind CSS.
- **Framer Motion**: Smooth page transitions and micro-animations.
- **Product Browsing**: View products by categories, featured products, and recommendations.
- **Shopping Cart**: Real-time cart state management using **Zustand**. Add, update quantities, or remove items easily.
- **Dynamic Coupon System**:
  - Apply discount codes during checkout.
  - Users automatically receive a 10% discount coupon on their next purchase if they spend over $200!

### 💳 Payment Integration

- **Stripe Checkout**: Secure, enterprise-grade payment processing.
- **Order Tracking**: Automatically registers orders and clears the cart upon a successful transaction.

### 🛡️ Admin Dashboard

- **Analytics & Graphs**: View Total Users, Total Products, Total Sales, and Total Revenue.
- **Daily Sales Chart**: Interactive line charts built with **Recharts** to visualize daily sales data.
- **Product Management**:
  - Create new products with image uploads powered by **Cloudinary**.
  - Delete products and easily toggle their "Featured" status.

## 🛠️ Tech Stack

**Frontend:**

- React 18 (Vite)
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Stripe.js
- Axios

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- Redis (Upstash) for caching & tokens
- Stripe API for payments
- Cloudinary for image hosting
- JSON Web Tokens (JWT)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system. You will also need accounts for Stripe, Cloudinary, and Upstash (Redis).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/theofficialvishal/E-commerce.git
   cd E-commerce
   ```

2. **Backend Setup:**

   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the `Backend` directory and add your credentials:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   UPSTASH_REDIS_URL=your_redis_url
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory and add your Stripe Publishable Key:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

### Running the App

1. **Start the Backend server:**

   ```bash
   cd Backend
   npm run dev
   ```

2. **Start the Frontend server:**

   ```bash
   cd Frontend
   npm run dev
   ```

3. **Open your browser:** Navigate to `http://localhost:5173`.

### 🐳 Running with Docker

You can easily run this application using Docker. This is especially useful for deployment (e.g., on Render) or if you want to avoid manual setup.

1. **Build the Docker Image:**
   Ensure you are in the root directory of the project and run:

   ```bash
   docker build -t e-commerce-app .
   ```

2. **Run the Docker Container:**
   You need to pass the required environment variables. Create a `.env` file in the root directory containing your backend environment variables, and run:

   ```bash
   docker run -p 4000:4000 --env-file .env e-commerce-app
   ```

   _(Note: The Docker container exposes port 4000 by default. Make sure to map it accordingly.)_

3. **Open your browser:** Navigate to `http://localhost:4000`.

---

_Designed and Developed by [Vishal]_
