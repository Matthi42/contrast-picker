<script setup lang="ts">
import { computed, ref } from 'vue';
import ArrowButton from '../components/arrowButton.vue'
import BigButton from '../components/bigButton.vue'
import C from '../components/c.vue'
import { useRoute } from 'vue-router'
import { useColorStore } from '../stores/color'

const route = useRoute()
const colorStore = useColorStore()
const arrows = ref([1,2,3,0,'c',4,7,6,5])

const variant = colorStore.getColorVariantColorsByID(route.params.colorVariantID as string)

const clickedArrow = (n: number) => {
    clicks.value.push({actualRotation: 0, chosenRotation:n})
}
const clicks = ref([] as {actualRotation:number, chosenRotation:number}[])

const currentSize = computed(() => `${100 * Math.pow(0.8, clicks.value.length)}px`)

</script>
<template>
    <div class="container">
        <div class="grid">
            <div v-for="n in arrows" :style="{backgroundColor: n == 'c' ?  variant.background : ''}">
                <ArrowButton v-if="n != 'c'" :rotation="(n as number)" @click="clickedArrow(n as number)"/>
                <C v-if="n == 'c'" :fill="variant.foreground" :width="currentSize"/>
            </div>
        </div>
        <div class="side">
            <div>{{ currentSize }}</div>
            <div>{{ clicks }}</div>
            <BigButton>Pause</BigButton>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container{
    display:grid;
    grid-template-columns: 340px 600px 340px;
    background-color: gray;
    height: 720px;
}
.grid{
    padding-top: 60px;
    grid-column-start: 2;
    display:grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 200px 200px 200px;
    div {
        display:flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
    }
}
.side {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    button{
        margin-bottom: 50px;
        width:250px
    }
}
</style>