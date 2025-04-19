<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <main>
    <div class="psp-screen">
      <RouterView />
    </div>
  </main>
  <footer>
    <p>Copyright (c) 2025 Juan Manuel López</p>
  </footer>
</template>

<style scoped>
@font-face {
  font-family: 'Planet Kosmos';
  src: url(@/assets/PlanetKosmos.ttf);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Planet Kosmos', sans-serif;
}

:global(html, body) {
  height: 100vh;
  width: 100vw;
}

:global(body) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
}

header,
footer {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  text-align: center;
  color: #fff;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
  padding-bottom: 5vh;
  width: 60vw;
  background-color: #027dde;
}

.psp-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56vh;
  width: 56vw;
}
</style>
