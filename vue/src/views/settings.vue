<script setup lang="ts">
import SmallButton from '../components/smallButton.vue';
import UserCard from '../components/userCard.vue';
import Modal from '../components/modal.vue';
import Dropdown from '../components/dropdown.vue';
import { useUserStore } from '../stores/users'
import { computed, reactive, Ref, ref } from 'vue';
import TextInput from '../components/textInput.vue';
import DateInput from '../components/dateInput.vue';
import ColorCard from '../components/colorCard.vue';
import { useColorStore } from '../stores/color';
import { v4 as uuidv4 } from 'uuid';
import { useDisabilityStore } from '../stores/disabilitys'
import { useRouter } from 'vue-router'
import { ColorCombination } from '../stores/types/color';
import Color from 'color';
import ColorInput from '../components/colorInput.vue';

const userStore = useUserStore()
const users = userStore.users
const currentUser = reactive({birthday: '',colors: [],disabilities:[],familyName:'',id:'',name:'',value:''}) 

const router = useRouter()

const colorStore = useColorStore()
const colors = colorStore.mainColors

const disabilityStore = useDisabilityStore()
const disabilities = disabilityStore.disabilitys

const editUser = ref(false)
const editUserData = (id:string) => {
    Object.assign(currentUser ,reactive(userStore.userByID(id)))
    editUser.value = true
}
const addUser = () => {
    Object.assign(currentUser, reactive(userStore.newUser()))
    console.log(currentUser);
    
    editUser.value = true
}
const saveUser = () => {
    //TODO: validation
    userStore.addUser(currentUser)
    console.log(currentUser.value);
    
    editUser.value=false
}

const editColor = ref({modal: false, newColor: false})

const color: Ref<ColorCombination> = ref({id: uuidv4(),name: '',background: new Color('#ffffff').hsl(),foreground: new Color('#ffffff').hsl(),disabilitys: [] })
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

const cname = ref('')


</script>

<template>
    <Modal v-model="editUser">
        <template v-slot:content>
            <div class="user-modal">
                <div>
                    <TextInput v-model="(currentUser.name)">Vorname</TextInput>
                    <TextInput v-model="currentUser.familyName">Nachname</TextInput>
                </div>
                <DateInput v-model="currentUser.birthday">Geburtsdatum</DateInput>
                <Dropdown  v-model:selectedOption="currentUser.disabilities[0]" v-model:options="disabilities">Erkrankung</Dropdown>
            </div>
        </template>
        <template v-slot:buttons>
            <SmallButton @click="saveUser">speichern</SmallButton>
            <SmallButton @click="editUser = false">abbrechen</SmallButton>
        </template>
    </Modal>
    <Modal v-model="editColor.modal">
        <template v-slot:content>
            <!-- <Dropdown v-model:selectedOption="op" v-model:options="options">title</Dropdown> -->
            <div class="user-modal">
                <TextInput v-model="color.name">Name</TextInput>
                <ColorInput :disabled="!editColor.newColor" :color="foreground" @update:color="foreground = $event">Vordergrund</ColorInput>
                <ColorInput :disabled="!editColor.newColor" :color="background" @update:color="background = $event">Hintergrund</ColorInput>
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
        <div class="t-button">
            <SmallButton @click="router.push({name: 'start'})">zurück</SmallButton>
        </div>
    </div>
    <div class="scroll">
        <div class="sheet">
            <div class="title-card">
                <div>Benutzer</div>
                <SmallButton variant="secondary" @click="addUser">Benutzer hinzufügen</SmallButton>
            </div>
            <UserCard v-for="u in users" :user="u" @edit="editUserData(u.id)" />
            <div class="title-card">
                <div>Hauptfarben</div>
                <SmallButton variant="secondary" @click="addColor">Farbe hinzufügen</SmallButton>
            </div>
            <ColorCard v-for="c in colors" :color="c" @click="editColorName(c)" />
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
    overflow:scroll;
}
</style>