import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useDisabilityStore = defineStore('disability', () => {
    
    const disabilities = reactive([] as string[])

    Neutralino.storage.getData('disabilities').then(d => {
        Object.assign(disabilities, reactive(JSON.parse(d) as string[]))
    }).catch((e) => {
        Neutralino.storage.setData('disabilities', '[]')
    })

    watch(disabilities, async (newVal, oldVal) => {
        await Neutralino.storage.setData('disabilities', JSON.stringify(newVal))
    }, {deep: true})

    const setDisability = (disability: string) => {
        if (!disabilities.some(d => d === disability))
        disabilities.push(disability)
    }

    return {
        disabilities,
        setDisability
    }
})