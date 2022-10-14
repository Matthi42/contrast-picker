<script setup lang="ts">
import SmallButton from './smallButton.vue';
defineProps({
    user: {
        type: Object,
        default: {
            id: '0',
            familyName: '',
            name: 'test User',
            birthday: new Date('01-01-2000'),
            disabilities: ['first', 'second'],
            colors: ['cid', 'cid2']
        } as User
    }
})
defineEmits(['edit'])

</script>
<template>
    <div class="card">
        <div class="name">
            <p>{{ user.name }}</p>
        </div>
        <div>
            <SmallButton @click="$emit('edit')">bearbeiten</SmallButton>
        </div>
        <div class="chip-container">
            <div class="chip" v-for="e in user.disabilities.filter((o:any) => Boolean(o) )">{{ e }}</div>
        </div>
        <div>
            
        </div>
    </div>

</template>
<style scoped lang="scss">
.card {
    width: 800px;
    border-style: solid;
    border-radius: 15px;
    border-color: gray;

    display:grid;
    grid-template-columns: auto 200px;
    grid-template-rows: auto auto;

    font-size: 20pt;
    div{
        padding:10px;
    }
}
.chip {
    background-color: lightgray;
    padding: 10px 20px 10px 20px;
    border-radius: 30px;
    white-space: nowrap;
}

.chip-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap:30px;
    
}
.name {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    gap:10px;
    align-items: center;
}

</style>