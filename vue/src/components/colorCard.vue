<script setup lang="ts">
import SmallButton from './smallButton.vue';
import ColorIndecator from './colorIndecator.vue';
import { ColorCombination } from '../stores/types/color';
import Color from 'color';
import TrashCan from './trashCan.vue';

const props = defineProps({
    color: {
        type: Object,
        default: {
            id: '0',
            background: new Color('#000000'),
            foreground: new Color('#ffffff'),
            name: 'test name',
            disabilities: ['drei', 'zwei', 'eins'],
        } as ColorCombination
    }
})

const a = (props.color.foreground as Color).rgb().hex()

console.log(props.color)
</script>
<template>
    <div class="card">
        <div class="name">
            <ColorIndecator width="45px" :color1="color.foreground.toString()" :color2=color.background.toString() /> 
            <p>{{ color.name }}</p>
            <span>({{ Math.round(color.foreground.contrast(color.background)*100)/100 }}:1)</span>
        </div>
        <div  class="h-group">
            <SmallButton @click="$emit('edit')">bearbeiten</SmallButton>
            <TrashCan @delete="$emit('delete')">sollen die Hauptfarben wirklich gelöscht werden?</TrashCan>
        </div>
        <div class="chip-container">
            <div class="chip" v-for="e in color.disabilities">{{ e }}</div>
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
    grid-template-columns: auto 220px;
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

.h-group {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>