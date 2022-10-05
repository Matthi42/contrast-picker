<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import C from "./components/c.vue"
import Arrow from "./components/arrow.vue"
import ColorIndecator from "./components/colorIndecator.vue"

const knob1: Ref <number| undefined> = ref(0)
const knob2: Ref <number| undefined> = ref(0)
const knob3: Ref <number| undefined> = ref(0)
const knob4: Ref <number| undefined> = ref(0)
const open = () => Neutralino.os.open('https://www.google.com')

Neutralino.events.on('adc-chan0',(ti: CustomEvent<number> | undefined) => {
  knob1.value = ti?.detail
})
Neutralino.events.on('adc-chan1',(ti: CustomEvent<number> | undefined) => {
  knob2.value = ti?.detail
})
Neutralino.events.on('adc-chan2',(ti: CustomEvent<number> | undefined) => {
  knob3.value = ti?.detail
})
Neutralino.events.on('adc-chan3',(ti: CustomEvent<number> | undefined) => {
  knob4.value = ti?.detail
})
Neutralino.events.on('adc-chan-all',(ti: CustomEvent<number[]> | undefined) => {
  knob1.value = ti?.detail[0] == undefined ? 0 : Math.floor(ti?.detail[0]/100) + 1
  knob2.value = ti?.detail[1]
  knob3.value = ti?.detail[2]
  knob4.value = ti?.detail[3]
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
    intervalID = setInterval(async () => {
      await Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan0')
      //await Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan1')
      //await Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan2')
      //await Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan3')
      //await Neutralino.extensions.dispatch('js.neutralino.adc','adc-chan-all')
      
    },333)
    checking.value = true
  }
}

const rotation = computed(() => knob1.value as number * 8  / 26390)  
</script>

<template>
  <C :rotation="rotation" :fill="'blue'" width="100"/>
  <Arrow :rotation="rotation" width="100px"/>
  <ColorIndecator :color1="'blue'" :color2="'red'" width = "100"/>
  <router-link to="/">1</router-link>
  <router-link to="/view2">2</router-link>
  <router-view/>
  <p @click="open" class="big-button">open Google</p> 
  <p @click="toggleAdc" class="big-button">
  ADC0-value: {{ `${checking?knob1:'Stopped'}` }}
  <br/>
  ADC1-value: {{ `${checking?knob2:'Stopped'}` }}
  <br/>
  ADC2-value: {{ `${checking?knob3:'Stopped'}` }}
  <br/>
  ADC3-value: {{ `${checking?knob4:'Stopped'}` }}
  </p>
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
  border-style: solid;
  border-color:darkblue;
  &:hover{
    cursor: pointer;
  }
}
</style>
