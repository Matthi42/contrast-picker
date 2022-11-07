<script setup lang="ts">
import SmallButton from './smallButton.vue';
import ColorIndecator from './colorIndecator.vue';
import { ColorCombination } from '../stores/types/color';
import Color from 'color';
import TrashCan from './trashCan.vue';
import Pen from './pen.vue';

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

</script>
<template>
    <div class="card">
        <div class="name">
            <ColorIndecator width="45px" :color1="color.foreground.toString()" :color2=color.background.toString() /> 
            <p>{{ color.name }}</p>
            
        </div>
        <div  class="h-group">
            <span>{{ Math.round(color.foreground.contrast(color.background)*100)/100 }}:1</span>
            <Pen @click="$emit('edit')" width="40">bearbeiten</Pen>
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
    grid-template-columns: auto 260px;
    grid-template-rows: auto auto;
    //padding: 0 20px 0 20px;

    font-size: 20pt;
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
    padding:10px;

}
.name {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    gap:10px;
    align-items: center;
    padding:10px
}

.h-group {
    padding:10px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap:10px;
    font-weight: 600;
    padding-right: 20px;
}
</style>