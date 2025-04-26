<!-- src/views/PSPView.vue -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { menuItems } from '@/constants/menuItems'
import { useXMBControls } from '@/composables/useXMBControls'
import XMBBackground from '@/components/XMBBackground.vue'
import XMBMainMenu from '@/components/XMBMainMenu.vue'
import XMBSubMenu from '@/components/XMBSubMenu.vue'
import PSPInfo from '@/components/PSPInfo.vue'

const { selectedCategory, selectedItem, handleKeyDown } = useXMBControls(menuItems)

// Variable para controlar si la navegación está bloqueada
const isNavigationBlocked = ref(false)

// Función personalizada para manejar eventos de teclado
const handleKeyDownWithModal = (event) => {
  // Si la navegación está bloqueada, no procesamos las teclas de navegación
  if (isNavigationBlocked.value) {
    // Permitimos que la tecla espacio siga funcionando para cerrar el modal
    if (event.code !== 'Space') {
      event.preventDefault()
      return
    }
  }

  // Si no está bloqueada, usamos el manejador normal
  handleKeyDown(event)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDownWithModal)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDownWithModal)
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
    <XMBSubMenu
      :items="menuItems[selectedCategory].items"
      :selected-item="selectedItem"
      @block-navigation="isNavigationBlocked = true"
      @unblock-navigation="isNavigationBlocked = false"
    />
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
