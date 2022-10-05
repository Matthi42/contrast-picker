<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps({ 
  fill: { type: String, default: 'rgb(0 0 0)' }, 
   rotation: { type: Number, default: 0 } 
})

const rotationS = computed(() => `rotate(${props.rotation * 45} 50 50)`)

</script>

<template>
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill-rule="evenodd" clip-rule="evenodd"
      d="M99.9999 50C99.9999 77.6143 77.6142 100 49.9999 100C25.8102 100 5.63256 82.8222 1 59.9996L21.7068 59.9996C25.8251 71.6518 36.9376 80 49.9999 80C66.5684 80 79.9999 66.5685 79.9999 50C79.9999 33.4315 66.5684 20 49.9999 20C36.9378 20 25.8255 28.3479 21.7071 39.9996L1.00016 39.9996C5.63301 17.1774 25.8105 -1.44779e-07 49.9999 -2.85934e-07C77.6142 -4.47074e-07 99.9999 22.3858 99.9999 50Z" 
        :fill="fill" :transform="rotationS" />
    </g>
  </svg>
</template>