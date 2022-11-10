<script setup lang="ts">
import BigButton from './bigButton.vue'
</script>
<template>
    <div class="card">
        <slot/>
        <BigButton :variant="'secondary'" class="button" @click="$emit('login',$event)">Einloggen</BigButton>
    </div>
</template>
<style scoped lang="scss">
.card {
    border-style: solid;
    width: 1000px;
    font-size: 32pt;
    line-height: 32pt;
    text-align: left;
    padding: 10px 10px 10px 50px;
    border-radius:30px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

</style>