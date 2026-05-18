import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from './routes/analytics.route.js'
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = path.resolve();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); //allows server to parse JSON data from request body
app.use(cookieParser()); //allows server to parse cookies from request headers

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use('/api/payments', paymentRoutes)
app.use('/api/analytics', analyticsRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../Frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
