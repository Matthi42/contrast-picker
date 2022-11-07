<script setup lang="ts">
import { useColorStore } from '../stores/color';
import { useDialStore } from '../stores/dial';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { computed, reactive } from '@vue/reactivity';
import ColorIndecator from '../components/colorIndecator.vue'
import AngleIndecator from '../components/angleIndecator.vue'
import BigButton from '../components/bigButton.vue'
import Color from 'color'
import { speak } from '../utils/speak';
import { useUserStore } from '../stores/users';

const route = useRoute()
const router = useRouter()
const colorStore = useColorStore()
const dialStore = useDialStore()

dialStore.startMesuaring()

// non reactice variables
let { mainColorID, foregroundChanges: fore, backgroundChanges: back, id, finishedTest, userID } = colorStore.getColorVariantByID(route.params.colorVariantID as string)
const { foreground: mainForeground, background: mainBackground } = colorStore.getMainColorByID(mainColorID)

const foregroundChanges = ref(fore)
const backgroundChanges = ref(back)

const isCalibrated = ref(false)
const workingOnForeground = ref(false)

const dialsCalibrated = computed(() => {
    let presision = 2
    if (workingOnForeground.value) {
        const calibrated = Math.abs(foregroundChanges.value[0] - mapValues.value(25)[0]) < presision
            && Math.abs(foregroundChanges.value[1] - mapValues.value(25)[1]) < presision
            && Math.abs(foregroundChanges.value[2] - mapValues.value(25)[2]) < presision
        if (calibrated)
            isCalibrated.value = true
        return calibrated
    } else {
        const calibrated = Math.abs(backgroundChanges.value[0] - mapValues.value(25)[0]) < presision
            && Math.abs(backgroundChanges.value[1] - mapValues.value(25)[1]) < presision
            && Math.abs(backgroundChanges.value[2] - mapValues.value(25)[2]) < presision
        if (calibrated)
            isCalibrated.value = true
        return calibrated
    }
})

const switchFocus = () => {
    isCalibrated.value = false
    workingOnForeground.value = !workingOnForeground.value
}

onUnmounted(() => {
    colorStore.modifyColorVariant({
        foregroundChanges: foregroundChanges.value,
        backgroundChanges: backgroundChanges.value,
        userID: route.params.userID as string,
        mainColorID: mainColorID,
        id: id,
        finishedTest: finishedTest
    })
    dialStore.stopMesuaring()
})
const mapValues = computed(() => (x: number, min: number = 0, max: number = 26300) => {
    const factor = (2 * x) / (max - min)
    return [
        Math.round(factor * dialStore.dials[0].value - x),
        Math.round(factor * dialStore.dials[1].value - x),
        Math.round(factor * dialStore.dials[2].value - x)
    ] as [number, number, number]
})
const colors = computed(() => {
    if (isCalibrated.value) {
        if (workingOnForeground.value) {
            let [h, s, l] = mapValues.value(25)
            let [hc, sc, lc] = [mainForeground.hue() + h, mainForeground.saturationl() + s, mainForeground.lightness() + l]
            let [rhc, rsc, rlc] = restrictValues([hc, sc, lc])
            foregroundChanges.value = [rhc - mainForeground.hue(), rsc - mainForeground.saturationl(), rlc - mainForeground.lightness()]
            return {
                foreground: `hsl(${rhc} ${rsc}% ${rlc}%)`,
                background: `hsl(${mainBackground.hue() + backgroundChanges.value[0]} ${mainBackground.saturationl() + backgroundChanges.value[1]}% ${mainBackground.lightness() + backgroundChanges.value[2]}%)`
            }
        } else {
            let [h, s, l] = mapValues.value(25)
            let [hc, sc, lc] = [mainBackground.hue() + h, mainBackground.saturationl() + s, mainBackground.lightness() + l]
            let [rhc, rsc, rlc] = restrictValues([hc, sc, lc])
            backgroundChanges.value = [rhc - mainBackground.hue(), rsc - mainBackground.saturationl(), rlc - mainBackground.lightness()]
            return {
                foreground: `hsl(${mainForeground.hue() + foregroundChanges.value[0]} ${mainForeground.saturationl() + foregroundChanges.value[1]}% ${mainForeground.lightness() + foregroundChanges.value[2]}%)`,
                background: `hsl(${rhc} ${rsc}% ${rlc}%)`
            }
        }
    } else {
        return {
            foreground: `hsl(${mainForeground.hue() + foregroundChanges.value[0]} ${mainForeground.saturationl() + foregroundChanges.value[1]}% ${mainForeground.lightness() + foregroundChanges.value[2]}%)`,
            background: `hsl(${mainBackground.hue() + backgroundChanges.value[0]} ${mainBackground.saturationl() + backgroundChanges.value[1]}% ${mainBackground.lightness() + backgroundChanges.value[2]}%)`
        }
    }

})
const restrictValues = ([h, s, l]: [number, number, number]) => {
    let [rh, rs, rl] = [h, s, l]
    if (h < 0 || h > 360)
        rh = (360 + h) % 360
    if (s < 0)
        rs = 0
    if (s > 100)
        rs = 100
    if (l < 0)
        rl = 0
    if (l > 100)
        rl = 100
    return [rh, rs, rl]
}

const textSizes = ref([36, 32, 24, 20, 16, 15])

onMounted(async () => {
    if (useUserStore().userByID(userID).speak) {
        await speak(
            'Hier kann die Vordergrundfarbe und die Hintergrundfarbe angepasst werden. ' +
            'Drehe alle Regler so dass die Zeiger rechts übereinstimmen und grün werden. ' +
            'Dann kann die Farbe mit den Reglern verändert werden. Die Regler verändern Farbton, Sättigung und Helligkeit einer Farbe. ' +
            'Um die Farbe zu wechseln drücke auf das Wort.'
            , 'de')
    }
})
</script>
<template>
    <div class="grid">

        <div class="board-container">
            <div class="text-board" :style="{ backgroundColor: colors.background, color: colors.foreground }">
                <p v-for="size in textSizes" :style="{ fontSize: `${size}pt`, }">AaBaCc {{ size }}pt</p>
            </div>
        </div>
        <div class="indecator-container">
            <div :style="{ backgroundColor: workingOnForeground ? colors.foreground : colors.background }">
                <p
                    :style="{ color: workingOnForeground ? (Color(colors.foreground).isLight() ? 'black' : 'white') : (Color(colors.background).isLight() ? 'black' : 'white') }">
                    {{ workingOnForeground ? 'Vordergrund' : 'Hintergrund' }}</p>
            </div>
            <div>
                <ColorIndecator width="200px" :color1="colors.foreground" :color2="colors.background"
                    @click="switchFocus" />
                <div>{{ dialsCalibrated ? '' : '' }}</div>
            </div>
        </div>
        <div class="button-container">
            <BigButton
                @click="router.push({ name: 'colorOverview', params: { userID: route.params.userID as string } })">
                zurück</BigButton>
            <BigButton>Test</BigButton>
        </div>
        <div class="indecators" :class="{ 'indecator-container-calibrated': dialsCalibrated }">
            <AngleIndecator :min-value="-25" :max-value="25"
                :value-top="workingOnForeground ? foregroundChanges[0] : backgroundChanges[0]"
                :value-bottom="mapValues(25)[0]" />
            <AngleIndecator :min-value="-25" :max-value="25"
                :value-top="workingOnForeground ? foregroundChanges[1] : backgroundChanges[1]"
                :value-bottom="mapValues(25)[1]" />
            <AngleIndecator :min-value="-25" :max-value="25"
                :value-top="workingOnForeground ? foregroundChanges[2] : backgroundChanges[2]"
                :value-bottom="mapValues(25)[2]" />
        </div>

    </div>
</template>
<style scoped lang="scss">
.grid {
    display: grid;
    grid-template-columns: 380px auto 230px 260px;
    height: 720px;
    background-color: gray;
}

.indecators {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(66, 66, 66);
}

.text-board {
    padding: 30px;
    border-radius: 30px;
    margin-left:25px;
}

.board-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 60px 10px 0px 10px;
}

.indecator-container {
    display: flex;
    flex-direction: column;

    div {
        width: 310px;
        border-radius: 30px;

        p {
            font-size: 32pt;
        }
    }

    justify-content: space-evenly;
    align-items: center;
}

.indecator-container-calibrated {
    background-color: rgb(34, 34, 34);
}
</style>