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

// Variable para almacenar la fecha y hora actual
const currentTime = ref('')

// Función para actualizar la fecha y hora
const updateTime = () => {
  const now = new Date()
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${day}/${month} ${hours}:${minutes}`
}

// Referencia para el intervalo de actualización de la hora
let timeInterval = null

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

  // Inicializar la hora actual
  updateTime()

  // Actualizar la hora cada minuto
  timeInterval = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDownWithModal)

  // Limpiar el intervalo cuando el componente se desmonta
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// Referencia al componente XMBMainMenu
const mainMenuRef = ref(null)

// Función para manejar el bloqueo de navegación
const handleBlockNavigation = () => {
  isNavigationBlocked.value = true
  // Llamamos al método blockNavigation del componente XMBMainMenu
  if (mainMenuRef.value) {
    mainMenuRef.value.blockNavigation()
  }
}

// Función para manejar el desbloqueo de navegación
const handleUnblockNavigation = () => {
  isNavigationBlocked.value = false
  // Llamamos al método unblockNavigation del componente XMBMainMenu
  if (mainMenuRef.value) {
    mainMenuRef.value.unblockNavigation()
  }
}
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
    <XMBMainMenu ref="mainMenuRef" :items="menuItems" :selected-category="selectedCategory" />
    <XMBSubMenu
      :items="menuItems[selectedCategory].items"
      :selected-item="selectedItem"
      @block-navigation="handleBlockNavigation"
      @unblock-navigation="handleUnblockNavigation"
    />
    <PSPInfo :time="currentTime" />
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
