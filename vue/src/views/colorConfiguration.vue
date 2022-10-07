<script setup lang="ts">
import { useColorStore } from '../stores/color';
import { useDialStore } from '../stores/dial';
import { useRoute } from 'vue-router';
import { ColorVariant } from '../stores/types/color';
import { onUnmounted, ref } from 'vue';

const route = useRoute()
const colorStore = useColorStore()
const dialStore = useDialStore()

dialStore.startMesuaring()

const { mainColorID, foregroundChanges, backgroundChanges} =  colorStore.getColorVariantByID(route.params.colorVariantID as string)

const workingOnForeground = ref(true)

onUnmounted(() => {
    dialStore.stopMesuaring()
})


</script>
<template>
    <div>
        {{ dialStore.dials[0] }}, {{ dialStore.dials[1] }}, {{ dialStore.dials[2] }}
    </div>
</template>