<script setup lang="ts">
import { computed } from '@vue/reactivity';
import ColorIndecator from './colorIndecator.vue'
import BigButton from './bigButton.vue'

const props = defineProps({
    data: Object
})

const hasVariants = computed(() => props?.data?.variants?.length !== 0)

</script>
<template>
    <div class="container">
        <div class="card" :class="[hasVariants ? 'card-single' : 'card-multi']">
            <div class="name-group" >
                <div>
                    <ColorIndecator width="70px" :color1="props?.data?.foreground" :color2="props?.data?.background" />
                </div>
                <p>{{ props?.data?.name }}</p>
            </div>
            <BigButton variant="secondary" @click.stop="$emit('create-variant')">Erstelle Variante</BigButton>
        </div>
        <div v-if="hasVariants" class="subcard">
            <div v-for="(v, i) in props?.data?.variants" class="variant-card">
                <div class="name-group">
                    <div>
                        <ColorIndecator width="70" :color1="v.foreground" :color2="v.background"/>
                    </div>
                    <p>{{ props?.data?.name }} {{ i + 1 }}</p>
                </div>
                <div class="btn-group">
                    <BigButton @click="$emit('edit', v.id)">Bearbeiten</BigButton>
                    <BigButton variant="secondary" @click="$emit('test',v.id)">Test</BigButton>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
p {
    margin: 0;
}
.card {
    border-style: solid;
    width: 1000px;
    font-size: 32pt;
    line-height: 32pt;
    text-align: left;
    padding: 10px 10px 10px 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.card-single {
    border-radius: 30px 30px 0 0;
}

.card-multi {
    border-radius: 30px;
}

.subcard {
    border-style: none solid solid solid;
    width: 980px;
    font-size: 32pt;
    line-height: 32pt;
    text-align: left;
    padding: 10px 10px 10px 70px;
    border-radius: 0 0 30px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;

    // white-space:nowrap;
}

.variant-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.name-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.btn-group {
    display:flex;
    justify-content: center;
    width:466px;
}
</style>