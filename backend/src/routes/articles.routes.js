import express from "express";
import Article from "../models/Article.js"; 

const router = express.Router();

// Crear artículo
router.post("/", async (req, res) => {
  try {
    const articulo = new Article(req.body); 
    await articulo.save();
    res.status(201).json(articulo);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el artículo",
      detalle: error.message,
    });
  }
});

// Obtener todos los artículos
router.get("/", async (req, res) => {
  try {
    const articulos = await Article.find(); 
    res.json(articulos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los artículos",
      detalle: error.message,
    });
  }
});

export default router;

