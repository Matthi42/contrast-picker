<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BigButton from '../components/bigButton.vue';
import BigColorCard from '../components/bigColorCard.vue'
import { useColorStore } from '../stores/color'
import Modal from '../components/modal.vue';
import { ref } from 'vue';
import { useTestStore } from '../stores/test'
import { useUserStore } from '../stores/users';
import Back from '../components/back.vue';

const route = useRoute()
const userID = route.params.userID as string
const router = useRouter()
const colorStore = useColorStore()
const modalOpen = ref(false)
const selectedColorID = ref('')

const testStore = useTestStore()
const userStore = useUserStore() 
const user = userStore.userByID(route.params.userID as string)

const logOut = () => {
    router.push({ name: 'login' })
}
const editVariant = (id: string) => {
    testStore.deleteTest(id)
    let color = colorStore.getColorVariantByID(id)
    color.finishedTest = false
    colorStore.modifyColorVariant(color)
    router.push({name: 'colorConfiguration', params: { userID: userID, colorVariantID: id}})
}
const createVariante = (mainColorID: string) => {
    colorStore.createColorVariant(route.params.userID as string ,mainColorID)
}
const testVariant = (id: string) => {
    if(colorStore.getColorVariantByID(id).finishedTest){
        selectedColorID.value = id 
        modalOpen.value = true
    } else {
        router.push({name: 'test', params:{ userID: userID, colorVariantID: id}})
    }
}
const overwriteTest = async () => {
    let color = colorStore.getColorVariantByID(selectedColorID.value)
    color.finishedTest = false
    colorStore.modifyColorVariant(color)
    await testStore.deleteTest(selectedColorID.value)
    router.push({name: 'test', params:{ userID: userID, colorVariantID: selectedColorID.value}})
}


</script>
<template>
    <Teleport to="#back">
        <Back @click="logOut"></Back>
    </Teleport>
    <!-- modal is only visible if model=true -->
    <Modal v-model="modalOpen">
        <template v-slot:content>
            <p>Sie haben bereits einen Test beendet.</p>
            <p>M??chten Sie diesen ??berschreiben?</p>
        </template>
        <template v-slot:buttons>
            <BigButton @click="overwriteTest">Ja</BigButton>
            <BigButton @click="modalOpen = false">Nein</BigButton>            
        </template>
    </Modal>
    <div>
        <div class="title">
            <div class="t-text">
                <h1>Farbkombinationen</h1>
            </div>
        </div>
        <div class="scroll">
            <BigColorCard 
                v-for="c in colorStore.colorsByUser(user)" 
                :data="c"
                @create-variant="createVariante(c.id)"
                @edit="editVariant"
                @test="testVariant"
            >
            </BigColorCard>
            <div></div>
        </div>
    </div>
</template>
<style scoped lang="scss">

p {
    font-size:32pt
}

</style>