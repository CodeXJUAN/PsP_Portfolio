<!-- src/components/PSP/XMBSubMenu.vue -->
<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  items: Array,
  selectedItem: Number,
})

// Función para calcular la opacidad basada en la distancia al elemento seleccionado
const getItemOpacity = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  if (distance === 0) return 1 // Elemento seleccionado: opacidad completa
  if (distance === 1) return 0.5 // Elementos adyacentes: opacidad media
  if (distance === 2) return 0.5 // Elementos un poco más alejados: opacidad baja
  return 0 // Elementos muy alejados: invisibles
}

// Función para determinar si el elemento debe ser visible
const isItemVisible = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  return distance <= 2 // Solo muestra elementos que están a 2 o menos posiciones de distancia
}

// Nueva función para calcular el desplazamiento vertical basado en la distancia
const getItemTransform = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)

  // Determinar dirección del desplazamiento (arriba o abajo)
  const direction = idx > props.selectedItem ? 1 : -1

  // Desplazamiento vertical diferenciado según la posición
  let translateY = 0

  if (direction < 0) {
    // Elementos por encima: 150px de desplazamiento
    translateY = distance * 150
  } else {
    // Elementos por debajo: 20px de desplazamiento
    translateY = distance * 20
  }

  return `translateY(${translateY * direction}px)`
}
</script>

<template>
  <div class="xmb-subitems">
    <div class="xmb-subitems-list">
      <div
        v-for="(subitem, idx) in items"
        :key="subitem.label"
        :class="['xmb-subitem', { selected: idx === selectedItem }]"
        :style="{
          opacity: getItemOpacity(idx),
          visibility: isItemVisible(idx) ? 'visible' : 'hidden',
          transform: getItemTransform(idx),
        }"
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
  transition:
    color 0.2s,
    opacity 0.3s,
    visibility 0.3s,
    transform 0.3s ease; /* Añadida transición para el transform */
  width: 100%;
  position: relative; /* Añadido para permitir posicionamiento relativo */
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
</style>
