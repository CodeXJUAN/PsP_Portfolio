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
  <div class="xmb-subitems">
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

  <aside v-if="isModalOpen && modalItem" class="xmb-modal">
    <div class="xmb-modal-content">
      <h2>{{ modalItem.label }}</h2>
      <p>Contenido detallado para {{ modalItem.label }}</p>
      <p class="modal-hint">Presiona espacio para cerrar</p>
    </div>
  </aside>
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

.xmb-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xmb-modal-content {
  background-color: #222;
  border: 2px solid #0072ce;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  color: white;
  box-shadow: 0 0 20px rgba(0, 114, 206, 0.5);
}

.xmb-modal-content h2 {
  color: #0072ce;
  margin-bottom: 15px;
}

.modal-hint {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #999;
  text-align: center;
}
</style>
