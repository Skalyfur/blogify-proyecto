<template>
  <MainLayout title="Ultimos artículos">
    <section class="articles-container">
      <div
        v-for="article in articles"
        :key="article._id"
        class="article-card"
        @click="goToDetail(article)"
      >
        <h2>{{ article.title }}</h2>
        <p>{{ truncate(article.content, 120) }}</p>
        <small>
          Por {{ article.author || "Anónimo" }} ·
          {{ formatDate(article.date) }}
        </small>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import { ref, onMounted } from "vue";
import { getArticles } from "../services/articlesService.js";
import { useRouter } from "vue-router";

const router = useRouter();
const articles = ref([]);

const goToDetail = (article) => {
  router.push(`/articles/${article._id}`);
};

const truncate = (text, len) =>
  text.length > len ? text.slice(0, len) + "..." : text;

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  articles.value = await getArticles();
});
</script>

<style scoped>
.articles-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;
}

/* --- Tarjeta de artículo elegante --- */
.article-card {
  background-color: #ffffff;
  color: #111;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: #111;
}

/* --- Tipografía --- */
.article-card h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000;
}

.article-card p {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.article-card small {
  color: #666;
  font-size: 0.85rem;
}

/* --- Animaciones suaves --- */
.article-card,
.article-card h2,
.article-card p,
.article-card small {
  transition: all 0.3s ease-in-out;
}

.article-card:hover h2 {
  color: #000;
}

.article-card:hover p {
  color: #222;
}
</style>
