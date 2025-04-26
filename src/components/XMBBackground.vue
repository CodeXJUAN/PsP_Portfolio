<!-- src/components/PSP/XMBBackground.vue -->
<script setup></script>

<template>
  <svg class="psp-bg-svg" viewBox="0 0 400 300" preserveAspectRatio="none">
    <defs>
      <linearGradient id="pspGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e6e6e6" />
        <stop offset="100%" stop-color="#222a4a" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#pspGradient)" />
    <path
      d="M0,200 Q100,150 200,200 T400,200"
      fill="none"
      stroke="#fff"
      stroke-width="6"
      opacity="0.3"
    >
      <animate
        attributeName="d"
        values="
          M0,200 Q100,150 200,200 T400,200;
          M0,210 Q100,170 200,210 T400,210;
          M0,200 Q100,150 200,200 T400,200
        "
        dur="6s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M0,250 Q120,220 200,250 T400,250"
      fill="none"
      stroke="#fff"
      stroke-width="4"
      opacity="0.2"
    >
      <animate
        attributeName="d"
        values="
          M0,250 Q120,220 200,250 T400,250;
          M0,260 Q120,240 200,260 T400,260;
          M0,250 Q120,220 200,250 T400,250
        "
        dur="8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
</template>

<style scoped>
.psp-bg-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
