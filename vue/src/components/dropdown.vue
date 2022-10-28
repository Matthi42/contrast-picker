<script setup lang="ts">import { ref } from 'vue';
import SmallButton from './smallButton.vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    options: Array<String>,
    selectedOption: {
        type: String,
        default: undefined
    }
})
const emit = defineEmits(['update:selectedOption', 'update:options'])
const open = ref(false)
const newItem = ref('')
const addItem = () => {
    if(newItem.value) {
        const op = props.options as string[]
        if(!op.some(v => v == newItem.value)){
            op.push(newItem.value)
            console.log(op);
            emit('update:options', op)
        }
        emit('update:selectedOption', newItem.value)
        newItem.value=''
    }
    
}
const target = ref(null)

onClickOutside(target, (event) => open.value = false)

</script>
<template>

    <div class="dropdown">
        <div class="label">
            <label><slot/>{{newItem}}</label>
        </div>
        
        <div @click="open= !open" class="selected-option">
            <div>
                {{ selectedOption }}
            </div>
            <div>
                <svg width="15px" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 75L50 0L100 75H0Z" fill="black" :transform="open ? '' :'rotate(180 50 37.5)'"/>
                </svg>

            </div>
        </div>
        <div class="dropdown-content" v-if="open" ref="target">
            <div class="input">
                <input type="text" v-model="newItem"/>
                <SmallButton @click="addItem">hinzufügen</SmallButton>
            </div>
            <div v-for="o in options" @click="$emit('update:selectedOption',o == selectedOption ? undefined : o)" class="item"
                :class="{'selected': o == selectedOption}">{{ o }}</div>
        </div>
        
        
    </div>
</template>

<style scoped lang="scss">
div {
    font-size: 20pt;
}

.dropdown {
    position: relative;
    display: inline-block;
    min-width: 250px;
}

.selected-option {
    padding: 15px;
    border-radius: 10px;
    border-style: solid;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-width:1px;
    white-space: nowrap;
    gap:15px;
}

.dropdown-content {
    display: flex;
    position: fixed;
    min-width: 160px;
    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-color: gray;
    z-index: 2;
    flex-direction: column;
    gap: 10px;
    justify-content: stretch;
    align-items: flex-start;
    max-height: 300px;
    overflow-y: scroll;
    border-radius: 10px;
}

.selected {
    background-color: lightblue;
}

.item {
    padding: 4px 20px 4px 20px;
    border-radius: 20px;
    white-space: nowrap;
    cursor: pointer;
}

.input {
    display: flex;
    border-width: 1px;
    border-bottom: solid;
    border-color: gray;
    padding: 5px
}

.label {
    text-align: left;
    font-size: 12pt;
    margin-bottom: -6px;
    padding-left:5px
}


</style>