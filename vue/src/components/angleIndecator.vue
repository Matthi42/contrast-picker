<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    minValue: { type: Number, default: -25 },
    maxValue: { type: Number, default: 25 },
    valueTop: { type: Number, default: 0 },
    valueBottom: { type: Number, default: 0 },
})
const topAngle = computed(() => `rotate(${((270 / Math.abs(props.minValue - props.maxValue)) * props.valueTop)} 50 50)`)
const bottomAngle = computed(() => `rotate(${((270 / Math.abs(props.minValue - props.maxValue)) * props.valueBottom)} 50 50)`)
const color = computed(() => props.valueBottom === props.valueTop ? 'lime' : 'white')

</script>
<template>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="200px">
        <path
            d="M18.0963 81.7334C11.7483 75.4952 7.39263 67.5147 5.58018 58.801C3.76774 50.0874 4.5799 41.0319 7.91396 32.7798C11.248 24.5278 16.9542 17.4496 24.311 12.4406C31.6678 7.43154 40.3447 4.71652 49.2445 4.63885C58.1444 4.56119 66.8673 7.12437 74.3104 12.0043C81.7535 16.8842 87.5824 23.8616 91.0599 32.0542C94.5375 40.2469 95.5076 49.2868 93.8475 58.0307C92.1874 66.7747 87.9717 74.83 81.7335 81.1781"
            :stroke="color" stroke-width="8" stroke-linecap="round" />
        <path
            d="M50.9919 20.1273C50.9278 20.6263 50.5031 21 50 21C49.4969 21 49.0722 20.6263 49.0081 20.1273L47.2761 6.62726C47.2395 6.3422 47.3273 6.05518 47.5172 5.83942C47.707 5.62365 47.9806 5.5 48.2679 5.5H51.7321C52.0194 5.5 52.293 5.62365 52.4828 5.83942C52.6727 6.05518 52.7605 6.3422 52.7239 6.62726L50.9919 20.1273Z"
            :fill="color" :stroke="color" stroke-width="2" stroke-linejoin="round" :transform="topAngle" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M45.4172 47.9973L50 26L54.5828 47.9973C54.8511 48.6105 55 49.2878 55 50C55 52.7614 52.7614 55 50 55C47.2386 55 45 52.7614 45 50C45 49.2878 45.1489 48.6105 45.4172 47.9973Z"
            :fill="color" :transform="bottomAngle" />
        <path
            d="M50 26L51.958 25.5921C51.7647 24.6647 50.9474 24 50 24C49.0526 24 48.2353 24.6647 48.042 25.5921L50 26ZM45.4172 47.9973L47.2495 48.7991C47.3049 48.6725 47.347 48.5405 47.3752 48.4052L45.4172 47.9973ZM54.5828 47.9973L52.6248 48.4052C52.653 48.5405 52.6951 48.6725 52.7505 48.7991L54.5828 47.9973ZM48.042 25.5921L43.4593 47.5894L47.3752 48.4052L51.958 26.4079L48.042 25.5921ZM56.5407 47.5894L51.958 25.5921L48.042 26.4079L52.6248 48.4052L56.5407 47.5894ZM52.7505 48.7991C52.9103 49.1642 53 49.569 53 50H57C57 49.0067 56.7919 48.0567 56.415 47.1954L52.7505 48.7991ZM53 50C53 51.6569 51.6569 53 50 53V57C53.866 57 57 53.866 57 50H53ZM50 53C48.3431 53 47 51.6569 47 50H43C43 53.866 46.134 57 50 57V53ZM47 50C47 49.569 47.0897 49.1642 47.2495 48.7991L43.585 47.1954C43.2081 48.0567 43 49.0067 43 50H47Z"
            :fill="color" :transform="bottomAngle" />

    </svg>
</template>