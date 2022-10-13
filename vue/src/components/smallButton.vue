<script setup lang="ts">

const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    }
})
</script>
<template>
    <button :class="variant">
        <slot/>
    </button>
</template>
<style lang="scss" scoped>
button {
    font-size: 20pt;
    padding: 7px 14px 7px 14px;
    border-radius: 10px ;
    border-style: none;
    &:hover {
        transform: scale(0.95);
        box-shadow: 0px 0px 22px 10px rgba(0, 0, 0, 0.24);
    }
}
.primary {
    background-color: #cfcfcf;
    &:hover {
        background-color: #e9e9e9;
    }
}
.secondary {
    background-color: rgb(179, 228, 130);
    &:hover {
        background-color: #baee86;
    }
}
</style>