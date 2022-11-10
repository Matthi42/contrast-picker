<script setup lang="ts">
import LoginCard from '../components/loginCard.vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/users';
import Back from '../components/back.vue';

const userStore = useUserStore();

const router = useRouter()
const back = () => {
    router.push({ name: "start" })
}
const loginUser = ({ name, id }: { name: string, id: string }) => {
    router.push({ name: 'colorOverview', params: { userID: id } })
}

</script>
<template>
    <Teleport to="#back">
        <Back @click="back"></Back>
    </Teleport>
    <div class="title">
        <div class="t-text">
            <h1>Wähle ein Konto </h1>
        </div>
    </div>
    <div class="scroll">
            <LoginCard v-for="u in userStore.userList" @login="loginUser(u)">{{ u.name }}</LoginCard>
            <div></div>
    </div>
</template>