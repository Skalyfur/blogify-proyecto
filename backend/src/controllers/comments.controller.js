import Article from "../models/Article.js";

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ msg: "Artículo no encontrado" });

    article.comments.push({ user: req.user.id, content });
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
