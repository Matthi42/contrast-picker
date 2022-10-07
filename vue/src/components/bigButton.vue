<script setup lang="ts">

const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    }
})
</script>
<template>
    <button @click="$emit('click',$event)" :class="variant">
        <slot/>
    </button>
</template>
<style lang="scss" scoped>
button {
    font-size: 32pt;
    /*font-weight: ;*/
    padding: 20px 40px 20px 40px;
    border-radius: 40px ;
    border-style: solid;
    border-color: black;
    border-width: 5px;
}
.primary {
    background-color: #D9D9D9;
}
.secondary {
    background-color: rgb(179, 228, 130);
}
</style>