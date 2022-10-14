<script setup lang="ts">
defineProps(['color','disabled'])
defineEmits(['update:color'])
</script>

<template>
    <div class="group">
        <div class="label">
            <label><slot/></label>
        </div>
        <div class="v-group">
            <input 
                type="color" 
                :value="color" 
                @input="$emit('update:color', ($event as any).target.value)" 
                :disabled="disabled"
            />
            <input 
                type="text" 
                :value="color" 
                @input="$emit('update:color', ($event as any).target.value)" 
                maxlength="7"
                :disabled="disabled"
            /> 
        </div>
    </div>
</template>

<style scoped lang="scss">
input {
    margin:0px;
    padding: 6px;
    border-radius: 10px;
    border-style: solid;
    border-width:1px;
    height: 36px;
    &[type="text"] {
        width: 90px;
    }
    &[type="color"] {
        width: 60px;
    }
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
}

.v-group {
    display:flex;
}

</style>