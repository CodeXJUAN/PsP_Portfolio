<script setup>
import { RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <header></header>
  <main class="psp">
    <div class="psp-left">
      <div class="left-end">
        <div class="border-end1"></div>
        <div class="gatilloL"></div>
      </div>
      <div class="left-centre">
        <Icon class="sony" icon="simple-icons:sony" />
      </div>
      <div class="left-start">
        <svg class="top2" viewBox="0 0 100 100">
          <path class="curva-fondo" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="curva-superior" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="forma-rellena" d="M 0 100 C 30 100, 60 60, 100 0 L 100 100 L 0 100 Z" />
          <line x1="0" y1="100" x2="0" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
        </svg>
        <svg class="bottom2" viewBox="0 0 100 100">
          <path class="curva-fondo" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="curva-superior" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="forma-rellena" d="M 0 100 C 30 100, 60 60, 100 0 L 100 100 L 0 100 Z" />
          <line x1="0" y1="100" x2="0" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
        </svg>
      </div>
    </div>
    <div class="psp-centre">
      <div class="psp-screen">
        <RouterView />
      </div>
      <div class="psp-bottom">
        <div class="bottom-left"></div>
        <div class="bottom-centre">
          <div class="speaker-centre"></div>
          <img src="/images/pspLogo.png" class="psplogo" />
        </div>
        <div class="bottom-right"></div>
      </div>
    </div>
    <div class="psp-right">
      <div class="right-start">
        <svg class="top1" viewBox="0 0 100 100">
          <path class="curva-fondo" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="curva-superior" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="forma-rellena" d="M 0 100 C 30 100, 60 60, 100 0 L 100 100 L 0 100 Z" />
          <line x1="0" y1="100" x2="0" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
        </svg>
        <svg class="bottom1" viewBox="0 0 100 100">
          <path class="curva-fondo" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="curva-superior" d="M 0 100 C 30 100, 60 60, 100 0" />
          <path class="forma-rellena" d="M 0 100 C 30 100, 60 60, 100 0 L 100 100 L 0 100 Z" />
          <line x1="0" y1="100" x2="0" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#027dde" stroke-width="10" />
        </svg>
      </div>
      <div class="right-centre"></div>
      <div class="right-end">
        <div class="border-end2">
          <div class="gatilloR"></div>
        </div>
      </div>
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

.top1 {
  position: absolute;
  top: 16vh;
  left: 13.7vw;
  width: 7vw;
  height: 3.7vh;
}

.bottom1 {
  position: absolute;
  bottom: 19.05vh;
  left: 13.75vw;
  width: 7vw;
  height: 3.7vh;
  transform: rotateX(180deg);
}

.top2 {
  position: absolute;
  top: 16vh;
  right: 13.7vw;
  width: 7vw;
  height: 3.7vh;
  transform: rotateY(180deg);
}

.bottom2 {
  position: absolute;
  bottom: 19.05vh;
  right: 13.75vw;
  width: 7vw;
  height: 3.7vh;
  rotate: 180deg;
}

.curva-fondo {
  stroke: #027dde;
  stroke-width: 10;
  fill: none;
}

.curva-superior {
  stroke: #027dde;
  stroke-width: 4;
  fill: none;
}

.forma-rellena {
  fill: #027dde;
}

.psp {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.psp-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56vh;
  width: 56vw;
}

.psp-centre {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
  padding-bottom: 5vh;
  width: 64vw;
  background-color: #027dde;
}

.psplogo {
  height: auto;
  width: 8vw;
  bottom: 20.5vh;
  right: 43vw;
  position: absolute;
}

.speaker-centre {
  height: 1vh;
  width: 1vw;
  background-color: black;
  position: absolute;
  bottom: 21.3vh;
  left: 46vw;
  border-radius: 0.2vw;
}

.sony {
  height: 12vh;
  width: 12vw;
  top: 18vh;
  left: 10.5vw;
  color: #d7d7d7;
  position: absolute;
  z-index: 1;
}

.psp-left,
.psp-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58vh;
  width: 6vw;
  background-color: #027dde;
}

.border-end1 {
  height: 58vh;
  width: 15vw;
  background-color: #027dde;
  position: absolute;
  right: 4.5vw;
  bottom: 22.5vh;
  border-radius: 50%;
}

.border-end2 {
  height: 58vh;
  width: 15vw;
  background-color: #027dde;
  position: absolute;
  left: 4.5vw;
  bottom: 22.5vh;
  border-radius: 50%;
}

.gatilloL {
  width: 8vw;
  height: 5vh;
  position: absolute;
  border-top-left-radius: 80px 80px;
  border-bottom-right-radius: 80px 80px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  background: white;
  opacity: 0.5;
  top: 16vh;
  left: 10vw;
  z-index: -1;
}

.gatilloR {
  width: 10vw;
  height: 8vh;
  position: absolute;
  border-top-right-radius: 100px 80px;
  border-bottom-left-radius: 80px 80px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  background: white;
  opacity: 0.5;
  top: -3.5vh;
  right: -71vw;
  z-index: -1;
}
</style>
