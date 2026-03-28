import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";  
import authRoutes from "./src/routes/auth.routes.js";
import articlesRoutes from "./src/routes/articles.routes.js";
import commentsRoutes from "./src/routes/comments.routes.js";
import userRoutes from "./src/routes/user.routes.js"; 

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la BD
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/users", userRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


