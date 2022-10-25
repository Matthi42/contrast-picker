<script setup lang="ts">
defineProps({ modelValue: Boolean })
defineEmits({ 
    'update:modelValue': Boolean,
    'close' : Boolean
})

</script>
<template>
    <div v-if="modelValue" class="overlay" @click="$emit('close',true)">
        <div class="container">
            <div class="content">
                <slot name="content"/>
            </div>
            <div class="buttons">
                <slot name="buttons"/>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.overlay {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(133, 133, 133, 0.664);
    display: flex;
    flex-direction: colum;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}

.container {
    height: 500px;
    width: 800px;
    background-color: white;
    border-radius: 20px;
    //font-size: 32pt;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    
}

.buttons {
    align-self: flex-end;
    padding: 20px;
}

.content {
    max-height: 400px;
    overflow: scroll;
}
</style>