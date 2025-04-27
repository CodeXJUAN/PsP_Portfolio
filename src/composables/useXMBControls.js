// src/composables/useXMBControls.js
import { ref } from 'vue'
import { playSound } from '@/utils/audio.js'

export function useXMBControls(menuItems) {
  const selectedCategory = ref(1)
  const selectedItem = ref(0)
  const moveSound = '/audios/audio_move.mp3'

  function selectLeft() {
    selectedCategory.value = (selectedCategory.value - 1 + menuItems.length) % menuItems.length
    selectedItem.value = 0
    playSound(moveSound)
  }

  function selectRight() {
    selectedCategory.value = (selectedCategory.value + 1) % menuItems.length
    selectedItem.value = 0
    playSound(moveSound)
  }

  function selectUp() {
    const items = menuItems[selectedCategory.value].items
    selectedItem.value = (selectedItem.value - 1 + items.length) % items.length
    playSound(moveSound)
  }

  function selectDown() {
    const items = menuItems[selectedCategory.value].items
    selectedItem.value = (selectedItem.value + 1) % items.length
    playSound(moveSound)
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        selectLeft()
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        selectRight()
        break
      case 'ArrowUp':
      case 'w':
      case 'W':
        selectUp()
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        selectDown()
        break
    }
  }

  return {
    selectedCategory,
    selectedItem,
    handleKeyDown,
  }
}
