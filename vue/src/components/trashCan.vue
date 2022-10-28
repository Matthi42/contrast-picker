<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import SmallButton from './smallButton.vue';

defineEmits(['delete'])

const trash = ref(null)

const open = ref(false)

onClickOutside(trash, _ => { open.value = false })

</script>
<template>
    <div class="dropdown" ref="trash">
        <svg width="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" @click="open = !open">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M16.1064 41.0034L27.2061 95.1895C27.6826 97.5158 29.7297 99.1861 32.1044 99.1861H67.7723C70.147 99.1861 72.1941 97.5158 72.6706 95.1895L83.7703 41.0034C84.4054 37.903 82.0367 35 78.872 35H21.0047C17.84 35 15.4713 37.903 16.1064 41.0034ZM49.9384 43.1248C47.5179 43.1248 45.5557 45.087 45.5557 47.5075V87.491C45.5557 89.9115 47.5179 91.8737 49.9384 91.8737C52.3589 91.8737 54.3211 89.9115 54.3211 87.491V47.5075C54.3211 45.087 52.3589 43.1248 49.9384 43.1248ZM63.2305 47.2245C63.4578 44.816 65.5968 43.022 68.0081 43.2175C70.4194 43.4131 72.1899 45.5241 71.9625 47.9326L68.202 87.7741C67.9747 90.1826 65.8357 91.9765 63.4244 91.781C61.0131 91.5854 59.2426 89.4744 59.47 87.0659L63.2305 47.2245ZM32.3908 43.4788C29.9795 43.6744 28.209 45.7854 28.4363 48.1939L32.1968 88.0353C32.4242 90.4439 34.5632 92.2378 36.9745 92.0423C39.3858 91.8467 41.1562 89.7357 40.9289 87.3272L37.1684 47.4858C36.9411 45.0772 34.802 43.2833 32.3908 43.4788Z"
                fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M34.4403 25.2508L37.9507 19.9026C38.3204 19.3393 38.9489 19 39.6227 19H60.2536C60.9274 19 61.5559 19.3393 61.9256 19.9026L65.436 25.2508C65.9219 25.9912 65.8417 26.8672 65.4006 27.4984H80C82.7614 27.4984 85 29.7369 85 32.4984V34.8466C85 35.9512 84.1045 36.8466 83 36.8466H16C14.8954 36.8466 14 35.9512 14 34.8466V32.4984C14 29.7369 16.2386 27.4984 19 27.4984H34.4757C34.0346 26.8672 33.9543 25.9912 34.4403 25.2508ZM41.757 27.4984H58.1193C58.1153 27.4927 58.1114 27.4871 58.1075 27.4814L55.7934 24.116C55.4203 23.5734 54.804 23.2492 54.1454 23.2492H45.7308C45.0723 23.2492 44.456 23.5734 44.0828 24.116L41.7687 27.4814C41.7649 27.4871 41.7609 27.4927 41.757 27.4984Z"
                fill="black" :transform="open ? 'rotate(20 100 31)' : ''" />
        </svg>
        <div class="dropdown-content" v-if="open">
            <slot />
            <SmallButton @click="$emit('delete')">ja</SmallButton>
            <SmallButton @click="open = false">Nein</SmallButton>
        </div>

    </div>

</template>
<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: flex;
    position: absolute;
    right: 0px;
    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-color: gray;
    z-index: 2;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    overflow: visible;
    border-radius: 10px;
    padding: 30px;
    white-space: nowrap;
}
</style>