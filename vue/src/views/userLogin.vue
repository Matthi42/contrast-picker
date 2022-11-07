<script setup lang="ts">
import { reactive } from 'vue';
import LoginCard from '../components/loginCard.vue';
import BigButton from '../components/bigButton.vue';
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