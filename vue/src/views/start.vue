<script setup lang="ts">
import BigButton from '../components/bigButton.vue';
import SmallButton from '../components/smallButton.vue';
import { useRouter } from 'vue-router'


const router = useRouter()

const startApp = () => {
    router.push({ name: 'login' })
}
const settings = () => {
    router.push({ name: 'settings' })
}

</script>
<template>
    <div class="grid">
        <div class="center">
            <BigButton :variant="'secondary'" @click="startApp">Start App</BigButton>
        </div>
        <div class="right">
            <SmallButton @click="settings">Einstellungen</SmallButton>
        </div>
    </div>
</template>
<style>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 720px;
    grid-column: 2;
}

.right {
    grid-column: 3;
    padding:30px;
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}

.grid {
    display: grid;
    grid-template-columns: 400px auto 400px;
}
</style>