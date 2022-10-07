<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BigButton from '../components/bigButton.vue';
import BigColorCard from '../components/bigColorCard.vue'
import { useColorStore } from '../stores/color'

const route = useRoute()
const userID = route.params.userID as string
const router = useRouter()
const colorStore = useColorStore()


const logOut = () => {
    router.push({ name: 'login' })
}
const editVariant = (id: string) => {
    router.push({name: 'colorConfiguration', params: { userID: userID, colorVariantID: id}})
}
const createVariante = (mainColorID: string) => {
    console.log('why does this event fire twice');
    colorStore.createColorVariant(route.params.userID as string ,mainColorID)
    // TODO: navigate directly to configuration 
    // router.push({name: 'colorConfiguration', params: {userID: '1', colorVariantID: '1'}})
}
const testVariant = (id: string) => {

}
</script>
<template>
    <div>
        <div class="title">
            <h1>Farbkombinationen<BigButton @click="logOut">Abmelden</BigButton>
            </h1>
            <!--TODO do it right-->
        </div>
        <div class="scroll">
            <BigColorCard 
                v-for="c in colorStore.colorsByUser(route.params.userID as string)" 
                :data="c"
                @create-variant="createVariante(c.id)"
                @edit="editVariant"
                @test="testVariant"
            >
            </BigColorCard>
        </div>
    </div>
</template>
<style scoped lang="scss">
.scroll {
    overflow: scroll;
    height: 500px;
    bottom: 0;
}

back {
    position: fixed;
    z-index: 1;
    right: 20px;
    top: 20px;
}

title {
    width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
</style>