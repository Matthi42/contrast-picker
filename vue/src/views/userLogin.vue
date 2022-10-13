<script setup lang="ts">
import { reactive } from 'vue';
import LoginCard from '../components/loginCard.vue';
import BigButton from '../components/bigButton.vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/users';

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
    <div class="title">
        <div class="t-text">
            <h1>Wähle ein Konto </h1>
        </div>
        <div class="t-button">
            <BigButton @click="back">zurück</BigButton>
        </div>
        <!--TODO do it right-->
    </div>
    <div class="scroll">
            <LoginCard v-for="u in userStore.userList" @login="loginUser(u)">{{ u.name }}</LoginCard>
            <div></div>
    </div>

</template>
<style scoped lan="scss">

back {
    position: fixed;
    z-index: 1;
    right: 20px;
    top: 20px;
}

</style>