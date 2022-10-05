<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    fill: { type: String, default: 'rgb(0 0 0)' },
    rotation: { type: Number, default: 0 }
})

const rotationS = computed(() => `rotate(${props.rotation * 45} 50 50)`)

</script>

<template>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M37.0294 86.0455L6.34315 55.3592C3.21895 52.235 3.21895 47.1697 6.34315 44.0455L37.0294 13.3592C42.0692 8.31946 50.6863 11.8888 50.6863 19.016V80.3886C50.6863 87.5159 42.0692 91.0852 37.0294 86.0455ZM50.6863 29.7025V69.7025H87.6863C92.1046 69.7025 95.6863 66.1208 95.6863 61.7025V37.7025C95.6863 33.2842 92.1046 29.7025 87.6863 29.7025H50.6863Z"
            :fill="fill" :transform="rotationS" />
    </svg>
</template>