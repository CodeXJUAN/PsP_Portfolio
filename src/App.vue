<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <header>
    <div class="header">
      <div>
        <h1 class="title">PSP Portfolio</h1>
      </div>
      <div>
        <button
          class="btn_controls"
          :class="{ 'active': showSidebar }"
          @click="toggleSidebar"
        >
          <span class="controls_txt">Controls</span>
          <img src="/public/images/teclado.png" class="controls_img" />
        </button>
      </div>
    </div>
  </header>
  <main>
    <div class="sidebar-controls" v-if="showSidebar">
      <div class="sidebar-list">
        <div class="sidebar-item">
          <span class="key">Keyboard Controls</span>
        </div>
        <div class="sidebar-item">
          <span class="key">← / A</span><span class="desc">Move left</span>
        </div>
        <div class="sidebar-item">
          <span class="key">→ / D</span><span class="desc">Move right</span>
        </div>
        <div class="sidebar-item">
          <span class="key">↑ / W</span><span class="desc">Move up</span>
        </div>
        <div class="sidebar-item">
          <span class="key">↓ / S</span><span class="desc">Move down</span>
        </div>
        <div class="sidebar-item">
          <span class="key">Spacebar</span><span class="desc">Select</span>
        </div>
      </div>
    </div>
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

footer {
  width: 100vw;
  height: 14vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: 0px 0px 20px 2px #636363;
}

header {
  width: 100vw;
  height: 14vh;
}

.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.title {
  font-size: 2rem;
  letter-spacing: 2px;
  color: #1c227e;
  font-family: 'Planet Kosmos';
  text-shadow: 0 3px 6px rgb(255, 255, 255);
}

.btn_controls {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffffff;
  background-color: transparent;
  border: none;
  padding: 10px;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.5;
}
.btn_controls.active {
  opacity: 1;
}
/* Eliminamos el hover */
.controls_img {
  width: 40px;
  height: 40px;
}

.sidebar-controls {
  position: fixed;
  top: 0;
  right: 0;
  width: 18vw;
  height: 100vh;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 38px 28px 28px 32px;
  z-index: 1001;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.close-sidebar {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s;
  opacity: 0.7;
}
.close-sidebar:hover {
  color: #ff5a5a;
  opacity: 1;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}
.sidebar-item {
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 10px;
  padding: 12px 10px;
  margin-bottom: 6px;
  font-size: 1.05rem;
  color: white;
  font-weight: 500;
}
.key {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 6px;
  padding: 6px 12px;
  margin-right: 18px;
  font-weight: 700;
  font-size: 1.1rem;
  color: #23235a;
  box-shadow: 0 1px 4px #0001;
}
.desc {
  opacity: 0.85;
}
.psp {
  margin: 0 auto;
}
</style>
