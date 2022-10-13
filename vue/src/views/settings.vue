<script setup lang="ts">
import SmallButton from '../components/smallButton.vue';
import UserCard from '../components/userCard.vue';
import Modal from '../components/modal.vue';
import Dropdown from '../components/dropdown.vue';
import { useUserStore } from '../stores/users'
import { reactive, Ref, ref } from 'vue';
import TextInput from '../components/textInput.vue';
import DateInput from '../components/dateInput.vue';
import ColorCard from '../components/colorCard.vue';
import { useColorStore } from '../stores/color';
import { v4 as uuidv4 } from 'uuid';

const userStore = useUserStore()
const users = userStore.users
const currentUser: Ref< User> = ref({birthday: '',colors: [],disabilities:[],familyName:'',id:'',name:'',value:''}) 
const colorStore = useColorStore()
const colors = colorStore.mainColors

const editUser = ref(false)
const editUserData = (id:string) => {
    currentUser.value = userStore.userByID(id)
    editUser.value = true
}
const addUser = () => {
    currentUser.value = {id: uuidv4(),familyName: "",name: "",birthday: "",disabilities: [],colors: []}
    editUser.value = true
}
const saveUser = () => {
    //TODO: validation
    userStore.addUser(currentUser.value)
    editUser.value=false
}

const options = reactive(['eins', 'zwei', 'drei', 'vier', 'fünf'])
const test = ref('w')
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
                <!-- <Dropdown  v-model:selectedOption="cur" v-model:options="options">Erkrankung</Dropdown> -->
            </div>
            <p>{{ currentUser.id }}</p>
        </template>
        <template v-slot:buttons>
            <SmallButton @click="saveUser">speichern</SmallButton>
            <SmallButton @click="editUser = false">abbrechen</SmallButton>
        </template>
    </Modal>
    <Modal>
        <template v-slot:content>
            <!-- <Dropdown v-model:selectedOption="op" v-model:options="options">title</Dropdown> -->

            <TextInput>Title</TextInput>

            <DateInput>Date</DateInput>
        </template>
        <template v-slot:buttons>
            <SmallButton>speichern</SmallButton>
            <SmallButton>abbrechen</SmallButton>
        </template>
    </Modal>
    <div class="title">
        <div class="t-text">
            <h1>Einstellungen</h1>
        </div>
        <div class="t-button">
            <SmallButton>zurück</SmallButton>
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
                <SmallButton variant="secondary">Farbe hinzufügen</SmallButton>
            </div>
            <ColorCard v-for="c in colors" :color="c" />
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