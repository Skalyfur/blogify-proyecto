import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Article({
      title,
      content,
      author: req.user.id
    });
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
