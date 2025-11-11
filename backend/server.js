import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));