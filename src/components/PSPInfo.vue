<!-- src/components/PSP/PSPInfo.vue -->
<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="psp-info">
    <span>16/4 22:30</span>
    <Icon icon="mdi:battery-high" class="psp-battery" />
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
