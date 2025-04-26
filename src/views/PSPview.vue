<!-- src/views/PSPView.vue -->
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { menuItems } from '@/constants/menuItems'
import { useXMBControls } from '@/composables/useXMBControls'
import XMBBackground from '@/components/XMBBackground.vue'
import XMBMainMenu from '@/components/XMBMainMenu.vue'
import XMBSubMenu from '@/components/XMBSubMenu.vue'
import PSPInfo from '@/components/PSPInfo.vue'

const { selectedCategory, selectedItem, handleKeyDown } = useXMBControls(menuItems)

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
    <XMBBackground />
    <XMBMainMenu :items="menuItems" :selected-category="selectedCategory" />
    <XMBSubMenu :items="menuItems[selectedCategory].items" :selected-item="selectedItem" />
    <PSPInfo />
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
</style>
