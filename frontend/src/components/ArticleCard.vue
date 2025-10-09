<template>
  <div class="article-card" @click="$emit('select', article)">
    <h2 class="title">{{ article.title }}</h2>
    <p class="content">{{ truncate(article.content, 100) }}</p>
    <small class="meta">
      Por <span class="author">{{ article.author || "Anónimo" }}</span> ·
      <span class="date">{{ new Date(article.date).toLocaleDateString() }}</span>
    </small>
  </div>
</template>

<script setup>
defineProps({
  article: Object
});

const truncate = (text, length) =>
  text.length > length ? text.slice(0, length) + "..." : text;
</script>

<style scoped>
.article-card {
  background-color: #f8f9fa;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.article-card:hover {
  background-color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.5rem;
}

.content {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.meta {
  color: #888;
  font-size: 0.8rem;
}

.author {
  font-weight: 500;
  color: #3a3a3a;
}

.date {
  color: #aaa;
}
</style>
