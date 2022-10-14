import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useDisabilityStore = defineStore('disability', () => {
    
    const disabilitys = reactive([] as string[])

    Neutralino.storage.getData('disabilitys').then(d => {
        Object.assign(disabilitys, reactive(JSON.parse(d) as string[]))
    }).catch((e) => {
    })

    watch(disabilitys, async (newVal, oldVal) => {
        await Neutralino.storage.setData('disabilitys', JSON.stringify(newVal))
    }, {deep: true})

    const setDisability = (disability: string) => {
        if (!disabilitys.some(d => d === disability))
            disabilitys.push(disability)
    }

    return {
        disabilitys,
        setDisability
    }
})