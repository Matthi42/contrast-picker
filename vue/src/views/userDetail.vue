<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from '@vue/reactivity';
import { useUserStore } from '../stores/users';
import { useColorStore } from '../stores/color';
import { useTestStore } from '../stores/test';
import Color from 'color';
import ColorIndecator from '../components/colorIndecator.vue';
import TrashCan from '../components/trashCan.vue';
import Back from '../components/back.vue';


const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const user = userStore.userByID(route.params.userID as string)

const colorStore = useColorStore()
const testStore = useTestStore()
const colors = computed(() => colorStore.colorsByUser(user).filter(c => c.variants.length !== 0).map(c => ({
    main: c,
    variants: c.variants.map(v => {
        const test = testStore.tests.get(v.id)
        return {
            variant: v,
            test: colorStore.getColorVariantByID(v.id).finishedTest && test != undefined ?
                Math.round(testStore.score(test) * 100) / 100 :
                0
        }
    }).sort((a, b) => b.test - a.test)
})).sort((a, b) => b.variants[0].test - a.variants[0].test))
const open = ref(colors.value.map(_ => false))

const deleteVariant = (id: string) => {
    colorStore.deleteVariantByID(id)
}

const wcag = (a: number) => {
    if (a < 3)
        return 'A'
    if (a < 4.5)
        return 'AA'
    else
        return 'AAA'
}


</script>
<template>
    <Teleport to="#back">
        <Back @click="router.push({ name: 'settings' })"></Back>
    </Teleport>
    <div class="title">
        <div class="t-text">
            <h1>Benutzer Informationen</h1>
        </div>
    </div>
    <div class="scroll">
        <div class="main">

            <div class="item">
                <div>Name:</div>
                <div>{{ user.name }} {{ user.familyName }}</div>
            </div>
            <div class="item">
                <div>Geburtsdatum:</div>
                <div>{{ `${user.birthday ? user.birthday : '-'}` }}</div>
            </div>
            <div class="item">
                <div>Sprache:</div>
                <div>{{ `${user.speak ? 'Ja' : 'Nein'}` }}</div>
            </div>
            <div class="item">
                <div>Erkrankungen:</div>
                <div class="v-group">
                    {{ `${user.disabilities.length !== 0 ? '' : '-'}` }}
                    <span v-for="(d, i) in user.disabilities">{{ d }}<span v-if="i !== user.disabilities.length - 1">;
                        </span></span>
                </div>
            </div>
            <div class="item ">
                <div>Farben:</div>
                <div class="stripes">
                    <div class="colors" v-for="(main, i) in colors">
                        <div class="bu" @click="open[i] = !open[i]">
                            <div >Hauptfarbe: {{ main.main.name }}</div>
                            <div class="h-tri-group">
                                <div>Varianten ({{ main.variants.length }}):</div>
                                <div>
                                    <svg width="15px" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 75L50 0L100 75H0Z" fill="black"
                                        :transform="open[i] ? '' : 'rotate(180 50 37.5)'" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-if="open[i]">
                            <div class="h-group" v-for="c in main.variants">
                                <ColorIndecator width="60" :color1="c.variant.foreground"
                                    :color2="c.variant.background">
                                </ColorIndecator>
                                <div class="v-group">
                                    <div>Kontrastverhältnis: {{ Math.round((new
                                            Color(c.variant.foreground)).contrast(new
                                                Color(c.variant.background)) * 100) / 100
                                    }}:1</div>
                                    <div>WCAG 2.1: {{ wcag(Math.round((new
                                Color(c.variant.foreground)).contrast(new
                                    Color(c.variant.background)) * 100) / 100) }}</div>
                                    <div>Score: {{ c.test == 0 ? "kein Test" : c.test }}</div>
                                </div>
                                <TrashCan @delete="deleteVariant(c.variant.id)">Soll die Variante wirklich gelöscht
                                    werden
                                </TrashCan>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped lang="scss">
.main {
    font-size: 20pt;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    //padding: 30px;
    height: 100%
}

.item {
    display: grid;
    grid-template-columns: 250px auto;
    text-align: start;
    width: 100%;

    &:nth-child(odd) {
        background-color: rgb(215, 236, 255);
    }

    padding: 10px 5px 10px 5px
}

.colors {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    &:nth-child(even) {
        background-color: rgb(255, 255, 255);
    }

    padding:10px 0 10px 0;
}

.h-group {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 10px;
    align-items: center;
    gap: 20px;

    width: 100%;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-color: rgb(117, 158, 212);

    &:last-child {
        border-bottom: none;
    }
}

.v-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
}

.h-tri-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-right: 5%;
}

.bu{
    border:solid 1px rgb(117, 158, 212);
    display: flex;
    flex-direction: column;
    padding: 20px  30px 20px 30px;
    cursor: pointer;
}
</style>