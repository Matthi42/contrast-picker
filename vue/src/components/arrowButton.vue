<script setup lang="ts">
import Arrow from'./arrow.vue'
const props = defineProps({
    rotation: {
        type: Number,
        default: 0
    }
})
</script >
<template>
    <button>
        <Arrow width="100px" :rotation="rotation"/>
    </button>
</template>
<style lang="scss" scoped>
button {
    border-radius: 40px;
    border-style: solid;
    border-color: black;
    border-width: 5px;
    width: 150px;
    height: 150px;
    padding:20px
}
</style>