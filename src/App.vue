<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <main>
    <div class="psp">
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
  font-family: 'Consolas', monospace;
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

:global(*) {
  text-shadow: 0 6px 12px rgba(0, 0, 0);
}

header,
footer {
  width: 100vw;
  height: 14vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  margin-top: 3vh;
  text-align: center;
  color: #fff;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.psp {
  height: 65vh;
  width: 65vw;
  background-color: #000;
  border: 1px solid #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 20px 10px #000;
}
</style>
