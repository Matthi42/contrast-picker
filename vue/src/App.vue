<!--
  root-component 
  contains a router view that turns into every other view in ./views
-->
<script setup lang="ts">
import X from './components/x.vue'
import { useRoute, useRouter } from 'vue-router';
import Home from './components/home.vue';
import { Ref, ref } from 'vue';
import Minus from './components/minus.vue';


const closeApp =  () => {
  Neutralino.os.showMessageBox('Programm schließen', 'Soll das Programm wirklich geschlossen werden?','OK_CANCEL', 'WARNING').then(button => {
    if(button == 'OK')
      Neutralino.app.exit()
  })
  // await Neutralino.window.maximize()
  // await Neutralino.window.unmaximize()
  // await Neutralino.window.setFullScreen()
}
const minimize = async () => {
  try {
    await Neutralino.window.exitFullScreen()
    await Neutralino.window.minimize()
  } catch (e)  {
    console.error(e)
  }
} 

const Route = useRoute()
const Router = useRouter()

</script>

<template>
  <div class="back">
    <div id="back"></div>
  </div>
  <div id="close" v-if="Route.name === 'start'">
    <X height="45" @click="closeApp"  />
    <Minus height="45" @click="minimize"/>
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
