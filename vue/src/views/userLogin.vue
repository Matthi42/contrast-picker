<script setup lang="ts">
import { reactive } from 'vue';
import LoginCard from '../components/loginCard.vue';
import BigButton from '../components/bigButton.vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/users';

const userStore = useUserStore();

const router = useRouter()
const back = () => {
    router.push({name: "start"})
}
const loginUser = ({name, id}:{name:string, id:string}) => {
    router.push({name: 'colorOverview', params: {userID: id}})
}

</script>
<template>
    <div>
        <div class="title">
            <h1>Wähle ein Konto <BigButton @click="back">zurück</BigButton></h1>
            <!--TODO do it right-->
        </div>
        <div class="scroll">
            <LoginCard 
                v-for="u in userStore.userList" 
                @login="loginUser(u)"
                >{{ u.name }}
            </LoginCard>
        </div>
    </div>
</template>
<style scoped lan="scss">
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