<script setup lang="ts">
// optional properties that change the colors of the icon
// the size is set with the width attrebute
defineProps({
    color1: { type: String, default: 'rgb(0 0 0)' },
    color2: { type: String, default: 'rgb(255 255 255)' }
})

</script>
    
<template>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0 8V92C0 94.2091 0.89543 96.2091 2.34314 97.6569L50 50L97.6569 2.34315C96.2091 0.89543 94.2091 0 92 0H8C3.58172 0 0 3.58172 0 8Z"
            :fill="color1" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M100 92V7.99999C100 5.79086 99.1046 3.79085 97.6569 2.34314L2.34314 97.6568C3.79085 99.1046 5.79085 100 8 100H92C96.4183 100 100 96.4183 100 92Z"
            :fill="color2" />
    </svg>
</template>