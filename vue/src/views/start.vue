<script setup lang="ts">
import BigButton from '../components/bigButton.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const startApp = () => {
    router.push({name: 'login'})
}

</script>
<template>
    <div class="center">
        <BigButton :variant="'secondary'" @click="startApp">Start App</BigButton>
    </div>
</template>
<style>
    .center{
        display:flex;
        align-items: center;
        justify-content: center;
        height: 600px;
    }

</style>