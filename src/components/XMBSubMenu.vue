<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: Array,
  selectedItem: Number,
})

const emit = defineEmits(['block-navigation', 'unblock-navigation'])

const isModalOpen = ref(false)

const modalItem = ref(null)

const accessSound = new Audio('/audios/audio_access.mp3')

const getItemOpacity = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  if (distance === 0) return 1
  if (distance === 1) return 0.5
  if (distance === 2) return 0.5
  return 0
}

const isItemVisible = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  return distance <= 2
}

const getItemTransform = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)

  const direction = idx > props.selectedItem ? 1 : -1

  let translateY = 0

  if (direction < 0) {
    translateY = distance * 150
  } else {
    translateY = distance * 20
  }

  return `translateY(${translateY * direction}px)`
}

const playAccessSound = () => {
  accessSound.currentTime = 0
  accessSound.play()
}

const toggleModal = (item) => {
  if (isModalOpen.value && modalItem.value === item) {
    closeModal()
  } else {
    openModal(item)
  }
}

const openModal = (item) => {
  playAccessSound()
  isModalOpen.value = true
  modalItem.value = item
  emit('block-navigation')
}

const closeModal = () => {
  isModalOpen.value = false
  modalItem.value = null
  emit('unblock-navigation')
}

const openExternalLink = (item) => {
  playAccessSound()

  let url = ''

  switch (item.label) {
    case 'LinkedIn':
      url = 'https://www.linkedin.com/in/juan-manuel-l%C3%B3pez-arrieta-0594912ab/'
      break
    case 'Github':
      url = 'https://github.com/CodeXJUAN'
      break
    case 'Email':
      url = 'mailto:juanmanuellopezarrieta@gmail.com'
      break
    default:
      openModal(item)
      return
  }
  setTimeout(() => {
    window.open(url, '_blank')
  }, 500)
}

const handleKeyDown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()

    if (isModalOpen.value) {
      closeModal()
    } else if (props.selectedItem !== undefined && props.items) {
      const selectedItem = props.items[props.selectedItem]

      if (
        selectedItem.icon === 'mdi:linkedin' ||
        selectedItem.icon === 'mdi:github' ||
        selectedItem.icon === 'fa6-solid:paper-plane'
      ) {
        openExternalLink(selectedItem)
      } else {
        openModal(selectedItem)
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (isModalOpen.value) {
    emit('unblock-navigation')
  }
})
</script>

<template>
  <div class="xmb-subitems" v-show="!isModalOpen">
    <div class="xmb-subitems-list">
      <button
        v-for="(subitem, idx) in items"
        :key="subitem.label"
        :class="['xmb-subitem', { selected: idx === selectedItem }]"
        :style="{
          opacity: getItemOpacity(idx),
          visibility: isItemVisible(idx) ? 'visible' : 'hidden',
          transform: getItemTransform(idx),
        }"
        @click="toggleModal(subitem)"
      >
        <Icon :icon="subitem.icon" class="xmb-subicon" />
        <span v-if="idx === selectedItem">{{ subitem.label }}</span>
      </button>
    </div>
  </div>

  <div v-if="isModalOpen && modalItem" class="xmb-detail-view">
    <div class="xmb-detail-content">
      <h2>{{ modalItem.label }}</h2>

      <!-- Contenido específico para cada subitem basado en su label -->
      <div v-if="modalItem.label === 'Where and what did I study?'" class="detail-section">
        <p>Estudié Ingeniería Informática en la Universidad de Vic.</p>
        <p>Me especialicé en desarrollo de software y sistemas.</p>
      </div>

      <div v-else-if="modalItem.label === 'Languages'" class="detail-section">
        <p>Español: Nativo</p>
        <p>Inglés: Nivel C1</p>
        <p>Catalán: Nivel C1</p>
      </div>

      <div v-else-if="modalItem.label === 'Certifications'" class="detail-section">
        <p>Certificación en Desarrollo Web Full Stack</p>
        <p>Certificación en Cloud Computing</p>
      </div>

      <div v-else-if="modalItem.label === 'Experience'" class="detail-section">
        <p>Desarrollador Web - Empresa XYZ (2022-Presente)</p>
        <p>Desarrollador Junior - Startup ABC (2020-2022)</p>
      </div>

      <div v-else-if="modalItem.label === 'Skills'" class="detail-section">
        <p>Frontend: Vue.js, React, HTML5, CSS3</p>
        <p>Backend: Node.js, Express, Python</p>
        <p>Bases de datos: MongoDB, MySQL</p>
      </div>

      <div v-else-if="modalItem.label === 'Software Development'" class="detail-section">
        <p>Aplicación de gestión de inventario</p>
        <p>Sistema de análisis de datos</p>
      </div>

      <div v-else-if="modalItem.label === 'Web Development'" class="detail-section">
        <p>Sitio web de comercio electrónico</p>
        <p>Plataforma de aprendizaje en línea</p>
      </div>

      <div v-else-if="modalItem.label === 'Mobile Apps'" class="detail-section">
        <p>Aplicación de seguimiento de fitness</p>
        <p>Aplicación de notas y recordatorios</p>
      </div>

      <div v-else-if="modalItem.label === 'Profile'" class="detail-section">
        <p>Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras.</p>
        <p>Me encanta aprender nuevas tecnologías y enfrentar desafíos complejos.</p>
      </div>

      <div v-else-if="modalItem.label === 'Interests'" class="detail-section">
        <p>Desarrollo de videojuegos</p>
        <p>Inteligencia artificial</p>
        <p>Música y producción de audio</p>
      </div>

      <div v-else-if="modalItem.label === 'Goals'" class="detail-section">
        <p>Convertirme en un desarrollador full-stack senior</p>
        <p>Contribuir a proyectos de código abierto</p>
        <p>Crear mi propia startup tecnológica</p>
      </div>

      <div v-else class="detail-section">
        <p>Contenido detallado para {{ modalItem.label }}</p>
      </div>

      <p class="modal-hint">Presiona espacio para cerrar</p>
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
  transition:
    color 0.2s,
    opacity 0.3s,
    visibility 0.3s,
    transform 0.3s ease;
  width: 100%;
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.xmb-subitem.selected {
  color: #fff;
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

.xmb-detail-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xmb-detail-content {
  padding: 30px;
  width: 90%;
  max-width: 800px;
  color: white;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.xmb-detail-content h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.detail-section {
  margin-bottom: 20px;
  line-height: 1.6;
}

.detail-section p {
  margin-bottom: 10px;
}

.modal-hint {
  margin-top: 30px;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  opacity: 0.7;
}
</style>
