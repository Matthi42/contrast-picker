<!--
  root-component 
  contains a router view that turns into every other view in ./views
-->
<script setup lang="ts">
import X from './components/x.vue'

const closeApp = () => {
  Neutralino.app.exit()
}

</script>

<template>
  <div id="close">
    <X height="45" @click="closeApp"/>
  </div>
  <Suspense><RouterView /></Suspense>
</template>

<style scoped lang="scss">
  #close {
    position: absolute;
    left:0;
    top:0;
    z-index: 3;
    padding:20px;
  }
</style>
