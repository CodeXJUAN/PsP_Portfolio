<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const menuItems = [
  {
    icon: 'mdi:music',
    label: 'Music',
    items: ['All Songs', 'Albums', 'Artists'],
  },
  {
    icon: 'mdi:movie-open',
    label: 'Video',
    items: ['All Videos', 'Movies', 'Clips'],
  },
  {
    icon: 'mdi:controller-classic',
    label: 'Games',
    items: ['All Games', 'Favorites', 'Recently Played'],
  },
  {
    icon: 'mdi:web',
    label: 'Internet',
    items: ['Browser', 'Bookmarks'],
  },
  {
    icon: 'mdi:cog',
    label: 'Settings',
    items: ['System', 'Display', 'Sound'],
  },
]
const selectedCategory = ref(1)
const selectedItem = ref(0)

function selectLeft() {
  selectedCategory.value = (selectedCategory.value - 1 + menuItems.length) % menuItems.length
  selectedItem.value = 0 // Reset item selection when changing category
}
function selectRight() {
  selectedCategory.value = (selectedCategory.value + 1) % menuItems.length
  selectedItem.value = 0
}
function selectUp() {
  const items = menuItems[selectedCategory.value].items
  selectedItem.value = (selectedItem.value - 1 + items.length) % items.length
}
function selectDown() {
  const items = menuItems[selectedCategory.value].items
  selectedItem.value = (selectedItem.value + 1) % items.length
}
</script>

<template>
  <div class="psp-xmb-bg">
    <svg class="psp-bg-svg" viewBox="0 0 400 300" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pspGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e6e6e6" />
          <stop offset="100%" stop-color="#222a4a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#pspGradient)" />
      <path
        :d="`M0,200 Q100,150 200,200 T400,200`"
        fill="none"
        stroke="#fff"
        stroke-width="6"
        opacity="0.3"
      >
        <animate
          attributeName="d"
          values="
            M0,200 Q100,150 200,200 T400,200;
            M0,210 Q100,170 200,210 T400,210;
            M0,200 Q100,150 200,200 T400,200
          "
          dur="6s"
          repeatCount="indefinite"
        />
      </path>
      <path
        :d="`M0,250 Q120,220 200,250 T400,250`"
        fill="none"
        stroke="#fff"
        stroke-width="4"
        opacity="0.2"
      >
        <animate
          attributeName="d"
          values="
            M0,250 Q120,220 200,250 T400,250;
            M0,260 Q120,240 200,260 T400,260;
            M0,250 Q120,220 200,250 T400,250
          "
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <div class="xmb-menu">
      <button class="xmb-arrow" @click="selectLeft">&#8592;</button>
      <div class="xmb-items">
        <div
          v-for="(item, idx) in menuItems"
          :key="item.label"
          :class="['xmb-item', { selected: idx === selectedCategory }]"
        >
          <Icon :icon="item.icon" class="xmb-icon" />
          <span class="xmb-label" v-if="idx === selectedCategory">{{ item.label }}</span>
        </div>
      </div>
      <button class="xmb-arrow" @click="selectRight">&#8594;</button>
    </div>
    <div class="xmb-subitems">
      <button class="xmb-arrow" @click="selectUp">&#8593;</button>
      <div class="xmb-subitems-list">
        <div
          v-for="(subitem, idx) in menuItems[selectedCategory].items"
          :key="subitem"
          :class="['xmb-subitem', { selected: idx === selectedItem }]"
        >
          {{ subitem }}
        </div>
      </div>
      <button class="xmb-arrow" @click="selectDown">&#8595;</button>
    </div>
    <div class="psp-info">
      <span>16/4 22:30</span>
      <span class="psp-battery"></span>
    </div>
  </div>
</template>

<style scoped>
.psp-xmb-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #222a4a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.psp-bg-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
.xmb-menu {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  /* Remove background and border-radius for transparent look */
  background: none;
  border-radius: 0;
  padding: 0;
}
.xmb-arrow {
  background: none;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  margin: 0 20px;
  user-select: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.xmb-arrow:hover {
  opacity: 1;
}
.xmb-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 38px;
}
.xmb-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bbb;
  font-size: 2.5rem;
  opacity: 0.5;
  transition:
    transform 0.2s,
    color 0.2s,
    opacity 0.2s;
  filter: drop-shadow(0 2px 2px #0008);
}
.xmb-item.selected {
  color: #fff;
  font-size: 3.5rem;
  opacity: 1;
  transform: scale(1.2);
  filter: drop-shadow(0 4px 8px #000a);
}
.xmb-label {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: none;
  padding: 4px 16px;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  letter-spacing: 1px;
}
.xmb-subitems {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.xmb-subitems-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin: 20px 0;
}
.xmb-subitem {
  color: #bbb;
  font-size: 1.3rem;
  opacity: 0.6;
  transition:
    color 0.2s,
    opacity 0.2s;
}
.xmb-subitem.selected {
  color: #fff;
  opacity: 1;
  font-size: 1.6rem;
}
.psp-info {
  position: absolute;
  bottom: 40px;
  right: 60px;
  color: #fff;
  font-family: 'Consolas', monospace;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 2;
}
.psp-battery {
  display: inline-block;
  width: 28px;
  height: 14px;
  border: 2px solid #fff;
  border-radius: 3px;
  position: relative;
  margin-left: 8px;
}
.psp-battery::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 3px;
  width: 4px;
  height: 6px;
  background: #fff;
  border-radius: 1px;
}
</style>
