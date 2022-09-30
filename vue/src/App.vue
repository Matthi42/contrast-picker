<script setup lang="ts">
import { Ref, ref } from 'vue';

const t: Ref <number| undefined> = ref(0)
const open = () => Neutralino.os.open('https://www.google.com')

Neutralino.events.on('adc-chan0',(ti: CustomEvent<number> | undefined) => {
  console.log(ti)
  t.value = ti?.detail
})
let intervalID: number | null = null
const checking = ref(false)
const toggleAdc = () => {
  if(checking.value) {
    if(intervalID)
      clearInterval(intervalID)
      intervalID = null
    checking.value = false
  } else {
    intervalID = setInterval(() => {
      Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan0')
    },100)
    checking.value = true
  }
}


</script>

<template>
  <router-link to="/">1</router-link>|
  <router-link to="/view2">2</router-link>
  <router-view/>
  <p @click="open" class="big-button">open Google</p>
  <p @click="toggleAdc" class="big-button">ADC-value: {{ `${checking?t:'Stopped'}` }}</p>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.big-button {
  width: 300px;
  height: 30px;
  border-style: solid;
  border-color:darkblue;
  &:hover{
    cursor: pointer;
  }

}
</style>
