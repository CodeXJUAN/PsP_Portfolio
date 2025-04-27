<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  time: {
    type: String,
  },
  battery: {
    type: String,
    default: 'high',
  },
})
</script>

<template>
  <div class="psp-info">
    <span>{{ time }}</span>
    <Icon :icon="`mdi:battery-${battery}`" class="psp-battery" />
  </div>
</template>

<style scoped>
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
