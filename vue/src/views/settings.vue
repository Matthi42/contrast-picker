<script setup lang="ts">
import SmallButton from '../components/smallButton.vue';
import UserCard from '../components/userCard.vue';
import Modal from '../components/modal.vue';
import Dropdown from '../components/dropdown.vue';
import { useUserStore } from '../stores/users'
import { computed, Ref, ref } from 'vue';
import TextInput from '../components/textInput.vue';
import DateInput from '../components/dateInput.vue';
import ColorCard from '../components/colorCard.vue';
import { useColorStore } from '../stores/color';
import { useTestStore } from '../stores/test';
import { v4 as uuidv4 } from 'uuid';
import { useDisabilityStore } from '../stores/disabilitys'
import { useRouter } from 'vue-router'
import { ColorCombination } from '../stores/types/color';
import Color from 'color';
import ColorInput from '../components/colorInput.vue';
import Speaker from '../components/speaker.vue';
import X from '../components/x.vue';
import Back from '../components/back.vue';
import { onKeyStroke } from '@vueuse/core';

const userStore = useUserStore()
const users = computed(() => userStore.fullUserList)
const currentUser = ref({birthday: '',colors: [] as string[],disabilities:[] as string[],familyName:'',id:'',name:'', speak:false}) 

const router = useRouter()

const colorStore = useColorStore()
const colors = computed(() => colorStore.mainColorList)

const disabilityStore = useDisabilityStore()
const disabilities = disabilityStore.disabilities

const editUser = ref(false)
const editUserData = (id:string) => {
    currentUser.value = userStore.userByID(id) as any
    editUser.value = true
}
const addUser = () => {
    currentUser.value = userStore.newUser()
    editUser.value = true
}
const addDisability = () => {
    currentUser.value.disabilities.push(option.value)
}

const saveUser = () => {
    //TODO: validation
    userStore.addUser(currentUser.value)
    editUser.value=false
    option.value = ''
}

const testStore = useTestStore()
const deleteUser = (userID: string) => {
    userStore.deleteUser(userID)
    const IDs = colorStore.deleteVariantsByUser(userID)
    IDs.forEach(id => testStore.deleteTest(id))
}

const openUserDetail = (UserID: string) => {
    router.push({name: 'userDetail', params: {userID: UserID}})
}

const editColor = ref({modal: false, newColor: false})

const color: Ref<ColorCombination> = ref({id: uuidv4(),name: '',background: new Color('#ffffff').hsl(),foreground: new Color('#ffffff').hsl(),disabilities: ['a'] as string[] })
const background = computed({
    get() { return color.value.background.hex().toString()},
    set(s: string) {color.value.background = new Color(s).hsl()}
})
const foreground = computed({
    get() { return color.value.foreground.hex().toString()},
    set(s: string) {color.value.foreground = new Color(s).hsl()}
})

const addColor = () => {
    color.value = colorStore.newColor()
    editColor.value = {modal: true, newColor: true}
}

const editColorName = (c: ColorCombination) => {
    color.value = c
    editColor.value = {modal: true, newColor: false}
}

const saveColor = ()  => {
    colorStore.addColor(color.value)
    editColor.value.modal = false
}

const addDisabilityColor = () => {
    color.value.disabilities.push(option.value)
}

const deleteColor = (colorID: string) => {
    const IDs = colorStore.deleteMainColor(colorID)
    IDs.forEach(id => {testStore.deleteTest(id)})
}

onKeyStroke('Enter', () => {
    if(editColor.value) 
        saveColor()
    if(editUser.value)
        saveUser()    
})

const option = ref('')
</script>

<template>
    <Teleport to="#back">
        <Back @click="router.push({ name: 'start' })"></Back>
    </Teleport>
    <Modal v-model="editUser" @close="saveUser">
        <template v-slot:content>
            <div class="user-modal">
                <div class= horizontal-group>
                    <div>
                        <TextInput v-model="(currentUser.name)">Vorname</TextInput>
                        <TextInput v-model="currentUser.familyName">Nachname</TextInput>
                    </div>
                        <Speaker v-model="currentUser.speak"/>
                </div>
                <DateInput v-model="currentUser.birthday">Geburtsdatum</DateInput>
                <div>
                    <Dropdown  v-model:selectedOption="option" v-model:options="disabilities">Erkrankung</Dropdown>
                    <SmallButton @click="addDisability">hinzufügen</SmallButton>
                </div>
                <div class="chip-x" v-for="d in currentUser.disabilities">
                    <div>{{d}}</div>
                    <X width="20" @click="currentUser.disabilities = currentUser.disabilities.filter(u => d !== u)"/>    
                </div>
            </div>
        </template>
        <template v-slot:buttons>
            <SmallButton @click="saveUser">speichern</SmallButton>
            <!-- <SmallButton @click="deleteUser(currentUser.id)">abbrechen</SmallButton> -->
        </template>
    </Modal>
    <Modal v-model="editColor.modal">
        <template v-slot:content>
            <!-- <Dropdown v-model:selectedOption="op" v-model:options="options">title</Dropdown> -->
            <div class="user-modal">
                <TextInput v-model="color.name">Name</TextInput>
                <div>
                    <ColorInput :disabled="!editColor.newColor" :color="foreground" @update:color="foreground = $event">Vordergrund</ColorInput>
                    <ColorInput :disabled="!editColor.newColor" :color="background" @update:color="background = $event">Hintergrund</ColorInput>
                </div>
                <div>
                    <Dropdown  v-model:selectedOption="option" v-model:options="disabilities">Erkrankung</Dropdown>
                    <SmallButton @click="addDisabilityColor">hinzufügen</SmallButton>
                </div>
                <div class="chip-x" v-for="d in color.disabilities">
                    <div>{{d}}</div>
                    <X width="20" @click="color.disabilities = color.disabilities.filter(u => d !== u)"/>
                </div>
            </div>
        </template>
        <template v-slot:buttons>
            <SmallButton @click="saveColor">speichern</SmallButton>
            <SmallButton @click="editColor.modal = false" >abbrechen</SmallButton>
        </template>
    </Modal>
    <div class="title">
        <div class="t-text">
            <h1>Einstellungen</h1>
        </div>
    </div>
    <div class="scroll">
        <div class="sheet">
            <div class="title-card">
                <div>Benutzer</div>
                <SmallButton variant="secondary" @click="addUser">Benutzer hinzufügen</SmallButton>
            </div>
            <UserCard v-for="u in users" :user="u" @edit="editUserData(u.id)" @delete="deleteUser(u.id)" @info="openUserDetail(u.id)" :key="u.id"/>
            <div class="title-card">
                <div>Hauptfarben</div>
                <SmallButton variant="secondary" @click="addColor">Farbe hinzufügen</SmallButton>
            </div>
            <ColorCard v-for="c in colors" :color="c" @edit="editColorName(c)" @delete="deleteColor(c.id)" :key="c.id"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sheet {
    width: 900px;
    box-shadow: 0px 0px 30px 14px rgba(0, 0, 0, 0.541);
    margin-top: 35px;
    margin-bottom: 35px;
    border-radius: 20px;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    font-size: 20pt;
    ;
}

.title-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 820px;
    margin-left: -20px;
    div {
        font-weight: 600;
    }
}

.user-modal {
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    gap: 15px;
}
.horizontal-group {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width: 740px;
}

.chip-x {
    background-color: lightblue;
    padding: 10px;
    border-radius: 100px;
    display:flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
}
</style>