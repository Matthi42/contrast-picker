<script setup lang="ts">
import SmallButton from './smallButton.vue';
import ColorIndecator from './colorIndecator.vue';
import { ColorCombination } from '../stores/types/color';
import Color from 'color';
const props = defineProps({
    color: {
        type: Object,
        default: {
            id: '0',
            background: new Color('#000000'),
            foreground: new Color('#ffffff'),
            name: 'test name',
            disabilitys: ['drei', 'zwei', 'eins'],
        } as ColorCombination
    }
})
console.log(props.color)
</script>
<template>
    <div class="card">
        <div class="name">
            <ColorIndecator width="45px" :color1="color.foreground.toString()" :color2=color.background.toString() /> 
            <p>{{ color.name }}</p>
        </div>
        <div>
            <SmallButton @click="$emit('edit')">bearbeiten</SmallButton>
        </div>
        <div class="chip-container">
            <div class="chip" v-for="e in color.disabilitys">{{ e }}</div>
        </div>
        <div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.card {
    width: 800px;
    border-style: solid;
    border-radius: 15px;
    border-color: gray;

    display: grid;
    grid-template-columns: auto 200px;
    grid-template-rows: auto auto;
    //padding: 0 20px 0 20px;

    font-size: 20pt;

    div {
        padding: 10px;
    }
}

.chip {
    background-color: lightgray;
    padding: 10px 20px 10px 20px;
    border-radius: 30px;
}

.chip-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 30px;

}
.name {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    gap:10px;
    align-items: center;
}
</style>