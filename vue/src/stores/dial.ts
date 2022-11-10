import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";

// store that is abstracting the dial logic
export const useDialStore = defineStore('dial', () => {
    // interval at wich the adc-extension will receive messages in ms
    const adcInterval = ref(333)
    const isMeasureing = ref(false)
    const dial0 = ref(0)
    const dial1 = ref(0)
    const dial2 = ref(0)
    const dial3 = ref(0)

    // these Neutralino events are fired when the adc-extensions sends data back
    Neutralino.events.on('adc-chan0', (adcValue: CustomEvent<number> | undefined) => {
        dial0.value = adcValue?.detail as number
    })
    Neutralino.events.on('adc-chan1', (adcValue: CustomEvent<number> | undefined) => {
        dial1.value = adcValue?.detail as number
    })
    Neutralino.events.on('adc-chan2', (adcValue: CustomEvent<number> | undefined) => {
        dial2.value = adcValue?.detail as number
    })
    Neutralino.events.on('adc-chan3', (adcValue: CustomEvent<number> | undefined) => {
        dial2.value = adcValue?.detail as number
    })
    Neutralino.events.on('adc-chan-all', (adcValues: CustomEvent<number[]> | undefined) => {
        dial0.value = adcValues?.detail[0] as number
        dial1.value = adcValues?.detail[1] as number
        dial2.value = adcValues?.detail[2] as number
        dial3.value = adcValues?.detail[3] as number
    })
    // interval is set when isMesuaring is changed to true
    let intervalID: number | undefined 
    watch(isMeasureing, newVal => {
        if(newVal) {
            intervalID = setInterval( async() => {
                await Neutralino.extensions.dispatch('js.neutralino.adc', 'adc-chan-all')
            }, adcInterval.value)
        } else {
            clearInterval(intervalID)
            intervalID = undefined
        }
    })

    // getter and setter for isMesuring
    const startMesuaring = () => {
        // set values to unreachable value to avoid problems
        dial0.value = -1000
        dial1.value = -1000
        dial2.value = -1000
        dial3.value = -1000
        isMeasureing.value = true 
    }
    const stopMesuaring = () => {
        isMeasureing.value = false 
    }
    const toggleMeasuring = () => {
        isMeasureing.value = !isMeasureing.value
    }

    return {
        dials: [ dial0, dial1, dial2, dial3 ] as Ref<number>[],
        startMesuaring,
        stopMesuaring,
        toggleMeasuring
    }
})