<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BigButton from '../components/bigButton.vue';
import BigColorCard from '../components/bigColorCard.vue'
import { useColorStore } from '../stores/color'
import Modal from '../components/modal.vue';
import { ref } from 'vue';

const route = useRoute()
const userID = route.params.userID as string
const router = useRouter()
const colorStore = useColorStore()
const modalOpen = ref(false)


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
    // TODO: if a test has alredy be made we need to ask if it should be deleted
    if(colorStore.getColorVariantByID(id).finishedTest){
        modalOpen.value = true
    } else {
        router.push({name: 'test', params:{ userID: userID, colorVariantID: id}})
    }
}
const overwriteTest = () => {
    // TODO:
}


</script>
<template>
    <!-- modal is only visible if model=true -->
    <Modal v-model="modalOpen">
        <template v-slot:content>
            <p>Sie haben bereits einen Test beendet.</p>
            <p>Möchten Sie diesen überschreiben?</p>
        </template>
        <template v-slot:buttons>
            <BigButton @click="overwriteTest">Ja</BigButton>
            <BigButton @click="modalOpen = false">Nein</BigButton>            
        </template>
    </Modal>
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
    height: 565px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
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