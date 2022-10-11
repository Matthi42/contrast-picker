<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ArrowButton from '../components/arrowButton.vue'
import BigButton from '../components/bigButton.vue'
import C from '../components/c.vue'
import { useRoute, useRouter } from 'vue-router'
import { useColorStore } from '../stores/color'
import { useTestStore } from '../stores/test'

const route = useRoute()
const router = useRouter()
const colorStore = useColorStore()
const testStore = useTestStore()
const arrows = ref([1,2,3,0,'c',4,7,6,5])

const colorVariantID = route.params.colorVariantID as string
await testStore.startTest(colorVariantID)

const variant = colorStore.getColorVariantColorsByID(colorVariantID)

const clickedArrow = async (n: number) => {
    await testStore.setTest(n) 
    await testStore.nextQuestion()
}

const currentSize = computed(() => `${Math.round(100 * Math.pow(0.8, testStore.test.currentPos[0]))}px`)



</script>
<template>
    <div class="container">
        <div class="grid">
            <div v-for="n in arrows" :style="{backgroundColor: n == 'c' ?  variant.background : ''}">
                <ArrowButton v-if="n != 'c'" :rotation="n as number" @click="clickedArrow(n as number)"/>
                <C v-if="n == 'c'" :fill="variant.foreground" :width="currentSize" :rotation="testStore.currentRotation"/>
            </div>
        </div>
        <div class="side">
            <!-- <div>{{ testStore.currentTest }}</div>
            <div>{{ testStore.testIDs }}</div>
            <div>{{ testStore.test.result}}</div> -->
            <div>{{ testStore.mistakesInCurrentLine }}</div>
            <!-- hier muss zu fehleransicht navigiert werden -->
            <div>{{ testStore.toManyMistakesInCurrentLine(router.back) }}</div>
            <BigButton @click="router.back">Pause</BigButton>
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