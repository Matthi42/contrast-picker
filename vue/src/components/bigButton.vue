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
    font-size: 32pt;
    /*font-weight: ;*/
    padding: 20px 40px 20px 40px;
    border-radius: 40px ;
    border-style: solid;
    border-color: black;
    border-width: 5px;
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