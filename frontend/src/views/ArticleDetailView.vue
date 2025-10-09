<template>
  <section v-if="article" class="article-detail">
    <h1 class="title">{{ article.title }}</h1>
    <p class="author">Por {{ article.author || "Anónimo" }}</p>
    <p class="content">{{ article.content }}</p>
    <small class="date">{{ formatDate(article.date) }}</small>

    <hr />

    <h3 class="comments-title">Comentarios</h3>
    <ul class="comments-list">
      <li v-for="comment in article.comments" :key="comment._id" class="comment">
        <strong class="comment-user">{{ comment.user || "Usuario" }}:</strong>
        <span class="comment-content">{{ comment.content }}</span>
        <br />
        <small class="comment-date">{{ formatDate(comment.date) }}</small>
      </li>
    </ul>

    <form class="comment-form" @submit.prevent="addComment">
      <input v-model="newComment.user" placeholder="Tu nombre" required />
      <textarea
        v-model="newComment.content"
        placeholder="Escribe tu comentario..."
        required
      ></textarea>
      <button type="submit">Comentar</button>
    </form>
  </section>

  <div v-else class="loading">Cargando artículo...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const article = ref(null);
const newComment = ref({ user: "", content: "" });

const formatDate = (date) => new Date(date).toLocaleString();

const fetchArticle = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/articles/${route.params.id}`
    );
    article.value = response.data;
  } catch (error) {
    console.error("Error al cargar el artículo:", error);
  }
};

const addComment = async () => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/comments/${route.params.id}`,
      newComment.value
    );
    article.value.comments.push(response.data);
    newComment.value = { user: "", content: "" };
  } catch (error) {
    console.error("Error al agregar comentario:", error);
  }
};

onMounted(fetchArticle);
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fdfdfd;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.title {
  font-size: 2rem;
  color: #222;
  margin-bottom: 0.3rem;
}

.author {
  color: #555;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.content {
  color: #333;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.date {
  color: #999;
  font-size: 0.9rem;
}

hr {
  border: none;
  border-top: 1px solid #e3e3e3;
  margin: 1.5rem 0;
}

.comments-title {
  font-size: 1.3rem;
  color: #2b2b2b;
  margin-bottom: 1rem;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.comment {
  background: #fafafa;
  border: 1px solid #eee;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.7rem;
}

.comment-user {
  color: #2b2b2b;
}

.comment-content {
  color: #444;
}

.comment-date {
  color: #aaa;
  font-size: 0.8rem;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.comment-form input,
.comment-form textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.comment-form input:focus,
.comment-form textarea:focus {
  border-color: #999;
  outline: none;
}

.comment-form button {
  align-self: flex-end;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.comment-form button:hover {
  background-color: #444;
}

.loading {
  text-align: center;
  margin-top: 4rem;
  color: #666;
}
</style>
