<!-- src/components/PSP/XMBMainMenu.vue -->
<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  items: Array,
  selectedCategory: Number,
})
</script>

<template>
  <div class="xmb-menu">
    <div class="xmb-items">
      <div
        v-for="(item, idx) in items"
        :key="item.label"
        :class="['xmb-item', { selected: idx === selectedCategory }]"
      >
        <Icon :icon="item.icon" class="xmb-icon" />
        <span class="xmb-label" v-if="idx === selectedCategory">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xmb-menu {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.xmb-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 38px;
  width: 100%;
  transition: transform 0.3s ease;
  transform: translateX(calc(-10% - var(--selected-category, 0) * 78px));
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
</style>
