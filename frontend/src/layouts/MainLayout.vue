<template>
  <div class="layout-container">
    <aside class="sidebar">
      <h2 @click="$router.push('/')">📰 Blogify</h2>
      <nav>
        <ul>
          <li @click="$router.push('/')">Inicio</li>
          <li @click="$router.push('/articles')">Artículos</li>
        </ul>
      </nav>
    </aside>

    <div class="main">
      <header class="topbar">
        <h1>{{ title }}</h1>
        <div class="actions">
          <button @click="$router.push('/login')" class="btn login">Iniciar sesión</button>
          <button @click="$router.push('/register')" class="btn register">Registrarse</button>
        </div>
      </header>

      <main class="content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Blogify",
  },
});
</script>

<style scoped>
.layout-container {
  display: flex;
  background-color: #ffffff;
  color: #111111;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* -------- SIDEBAR -------- */
.sidebar {
  width: 240px;
  background-color: #0d0d0d;
  color: #f9f9f9;
  padding: 1.8rem;
  border-right: 1px solid #1e1e1e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar h2 {
  color: #ffffff;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.sidebar h2:hover {
  color: #bfbfbf;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 0.6rem 0;
  color: #d1d1d1;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.sidebar li:hover {
  color: #ffffff;
  transform: translateX(5px);
}

/* -------- MAIN AREA -------- */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

/* -------- TOPBAR -------- */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fafafa;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
}

/* -------- BOTONES -------- */
.actions {
  display: flex;
  gap: 0.8rem;
}

.btn {
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.btn.login {
  background-color: transparent;
  border: 1px solid #111;
  color: #111;
}

.btn.login:hover {
  background-color: #111;
  color: #fff;
}

.btn.register {
  background-color: #111;
  color: #fff;
}

.btn.register:hover {
  background-color: #333;
}

/* -------- CONTENT -------- */
.content {
  padding: 2rem;
  flex: 1;
  background-color: #ffffff;
  color: #111111;
}

/* -------- EFECTOS SUTILES -------- */
.sidebar,
.topbar,
.btn {
  transition: all 0.3s ease-in-out;
}
</style>
