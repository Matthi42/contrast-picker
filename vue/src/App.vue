<!--
  root-component 
  contains a router view that turns into every other view in ./views
-->
<script setup lang="ts">
import X from './components/x.vue'
import { useRoute, useRouter } from 'vue-router';
import Home from './components/home.vue';

const closeApp = () => {
  Neutralino.app.exit()
}

const Route = useRoute()
const Router = useRouter()

</script>

<template>
  <div class="back">
    <div id="back"></div>
  </div>
  <div id="close">
    <X height="45" @click="closeApp" v-if="Route.name === 'start'" />
  </div>
  <div id="home">
    <Home height="45" v-if="Route.name !== 'start'" @click="Router.push({ name: 'start' })" />
  </div>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped lang="scss">
#close {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  padding: 20px;
}

#home {
  position: absolute;
  left: 66px;
  top: 0;
  z-index: 3;
  padding: 20px;
}

#back {
  width: 45px;
}

.back {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  padding: 20px;
}
</style>
