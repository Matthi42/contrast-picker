<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
<template>
    <div class="group">
        <div class="label">
            <label><slot/></label>
        </div>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', ($event as any).target.value)"/>
    </div>
        
    
</template>
<style scoped lang="scss">
input {
    padding: 12px;
    border-radius: 10px;
    border-style: solid;
    border-width:1px
}
.label {
    text-align: left;
    font-size: 12pt;
    margin-bottom: -6px;
    padding-left:5px
}

.group {
    position: relative;
    display: inline-block;
    min-width: 250px;
}

</style>