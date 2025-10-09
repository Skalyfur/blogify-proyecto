<script setup>
// No necesitas importar nada aquí si solo usas RouterView
</script>

<template>
  <header class="header">
    <h1 @click="$router.push('/')">Blogify</h1>
  </header>

  <main class="main-content">
    <!-- Aquí Vue Router insertará la vista actual -->
    <RouterView />
  </main>
</template>

