import { createRouter, createWebHistory } from "vue-router";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleDetailView from "../views/ArticleDetailView.vue";

const routes = [
  { path: "/", name: "articles", component: ArticlesView },
  { path: "/articles/:id", name: "article-detail", component: ArticleDetailView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
