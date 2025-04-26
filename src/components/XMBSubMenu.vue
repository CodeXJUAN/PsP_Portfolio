<!-- src/components/PSP/XMBSubMenu.vue -->
<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  items: Array,
  selectedItem: Number,
})
</script>

<template>
  <div class="xmb-subitems">
    <div class="xmb-subitems-list">
      <div
        v-for="(subitem, idx) in items"
        :key="subitem.label"
        :class="['xmb-subitem', { selected: idx === selectedItem }]"
      >
        <Icon :icon="subitem.icon" class="xmb-subicon" />
        <span v-if="idx === selectedItem">{{ subitem.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  width: 101%;
  transition: transform 0.3s ease;
  transform: translateY(calc(15% - var(--selected-item, 0) * 60px));
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
  font-size: 2.5rem;
  transition: all 0.2s ease;
}
.xmb-subitem.selected .xmb-subicon {
  font-size: 3.5rem;
}
</style>
