<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const menuItems = [
  {
    icon: 'material-symbols:school-rounded',
    label: 'Education',
    items: [
      { icon: 'mdi:school', label: 'University' },
      { icon: 'mdi:certificate', label: 'Certifications' },
      { icon: 'mdi:book-education', label: 'Courses' },
    ],
  },
  {
    icon: 'material-symbols:work',
    label: 'Experience',
    items: [
      { icon: 'mdi:briefcase', label: 'Work History' },
      { icon: 'mdi:tools', label: 'Skills' },
      { icon: 'mdi:star', label: 'Achievements' },
    ],
  },
  {
    icon: 'tabler:code',
    label: 'Projects',
    items: [
      { icon: 'mdi:github', label: 'GitHub Projects' },
      { icon: 'mdi:web', label: 'Web Development' },
      { icon: 'mdi:android', label: 'Mobile Apps' },
    ],
  },
  {
    icon: 'majesticons:user',
    label: 'About me',
    items: [
      { icon: 'mdi:account', label: 'Profile' },
      { icon: 'mdi:heart', label: 'Interests' },
      { icon: 'mdi:target', label: 'Goals' },
    ],
  },
  {
    icon: 'material-symbols:mail-rounded',
    label: 'Contact',
    items: [
      { icon: 'mdi:email', label: 'Email' },
      { icon: 'mdi:linkedin', label: 'LinkedIn' },
      { icon: 'mdi:github', label: 'Github' },
    ],
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

function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      selectLeft()
      break
    case 'ArrowRight':
    case 'd':
      selectRight()
      break
    case 'ArrowUp':
    case 'w':
      selectUp()
      break
    case 'ArrowDown':
    case 's':
      selectDown()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="psp-xmb-bg"
    :style="{
      '--selected-category': selectedCategory,
      '--selected-item': selectedItem,
    }"
  >
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
    </div>
    <div class="xmb-subitems">
      <div class="xmb-subitems-list">
        <div
          v-for="(subitem, idx) in menuItems[selectedCategory].items"
          :key="subitem.label"
          :class="['xmb-subitem', { selected: idx === selectedItem }]"
        >
          <Icon :icon="subitem.icon" class="xmb-subicon" />
          <span>{{ subitem.label }}</span>
        </div>
      </div>
    </div>
    <div class="psp-info">
      <span>16/4 22:30</span>
      <Icon icon="mdi:battery-high" class="psp-battery" />
    </div>
  </div>
</template>

<style scoped>
.psp-xmb-bg {
  position: relative;
  width: 100%;
  height: 100%;
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
  width: 100%;
}
.xmb-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 38px;
  width: 100%;
  transition: transform 0.3s ease;
  transform: translateX(calc(50% - var(--selected-category, 0) * 120px));
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
.xmb-subitems {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
}
.xmb-subitems-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  margin: 20px 0;
  width: 100%;
  transition: transform 0.3s ease;
  transform: translateY(calc(50% - var(--selected-item, 0) * 60px));
}

.xmb-subitem {
  display: flex;
  align-items: center;
  color: #bbb;
  font-size: 1.3rem;
  opacity: 0.6;
  transition:
    color 0.2s,
    opacity 0.2s;
  width: 100%;
}
.xmb-subitem.selected {
  color: #fff;
  opacity: 1;
  font-size: 1.6rem;
}
.xmb-subicon {
  margin-right: 8px;
  font-size: 2.5rem; /* Igualado al tamaño de los iconos principales */
  transition: all 0.2s ease;
}
.xmb-subitem.selected .xmb-subicon {
  font-size: 3.5rem; /* Igualado al tamaño seleccionado */
}
.psp-info {
  position: absolute;
  top: 40px;
  right: 60px;
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 2;
}

.psp-battery {
  font-size: 2rem;
  rotate: 270deg;
}
</style>
