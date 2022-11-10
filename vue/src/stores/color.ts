import Color from "color";
import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { ColorCombination, ColorCombinationSerialized, ColorVariant, UserColors } from "./types/color";
import { v4 as uuidv4 } from 'uuid'

const serializeColor = (color: Color) => color.hsl().string()
const deSerializeColor = (color: string) => Color(color).hsl()


export const useColorStore = defineStore('color', () => {
    const mainColors = ref(new Map() as Map<string, ColorCombination>)
    const colorVariants = reactive([] as ColorVariant[])

    Neutralino.storage.getData('main-colors').then(c => {
        mainColors.value = new Map(
            (JSON.parse(c) as Array<ColorCombinationSerialized>).map((co) => ([co.id, {
                id: co.id,
                name: co.name,
                foreground: deSerializeColor(co.foreground),
                background: deSerializeColor(co.background),
                disabilities: co.disabilities
            } as ColorCombination]))
        )
    }).catch(e => {
        Neutralino.storage.setData('main-colors', '[]')
    })
    Neutralino.storage.getData('color-variants').then(c => {
        Object.assign(colorVariants, reactive(JSON.parse(c) as ColorVariant[]))
    }).catch(async e => {
        await Neutralino.storage.setData('color-variants', '[]')
    })
    watch(mainColors, async (newVal, oldVal) => {
        await Neutralino.storage.setData(
            'main-colors',
            JSON.stringify(Array.from(newVal).map(([k, c]) => ({
                id: c.id,
                name: c.name,
                foreground: serializeColor(c.foreground),
                background: serializeColor(c.background),
                disabilities: c.disabilities
            })))
        )
    }, { deep: true })
    watch(colorVariants, async (newVal, oldVal) => {
        await Neutralino.storage.setData('color-variants', JSON.stringify(newVal))
    })


    const colorsByUser = computed(() => (user: User) =>
        Array.from(mainColors.value).map(([k, c]) => ({
            id: c.id,
            name: c.name,
            foreground: c.foreground.hsl().string(),
            background: c.background.hsl().string(),
            variants: colorVariants
                .filter((v) => v.mainColorID === c.id && user.id === v.userID)
                .map((v) => ({
                    id: v.id,
                    foreground: `hsl(${c.foreground.hue() + v.foregroundChanges[0]} ${c.foreground.saturationl() + v.foregroundChanges[1]}% ${c.foreground.lightness() + v.foregroundChanges[2]}%)`,
                    background: `hsl(${c.background.hue() + v.backgroundChanges[0]} ${c.background.saturationl() + v.backgroundChanges[1]}% ${c.background.lightness() + v.backgroundChanges[2]}%)`
                })),
            disabilities: c.disabilities
        })).sort((a, b) => {
            if (a.disabilities.some(d => user.disabilities.some(dis => dis === d)))
                return -1
            else return 1
        }) as UserColors
    )
    const createColorVariant = (userID: string, combinationID: string) => {
        colorVariants.push({
            id: uuidv4(),
            mainColorID: combinationID,
            userID: userID,
            foregroundChanges: [0, 0, 0],
            backgroundChanges: [0, 0, 0],
            finishedTest: false
        })
    }

    const modifyColorVariant = (newVal: ColorVariant) => {
        const index = colorVariants.findIndex(v => v.id === newVal.id)
        colorVariants[index] = newVal
    }
    const addColor = (color: ColorCombination) => {
        mainColors.value.set(color.id, color)
    }

    const newColor = () => {
        const newc = {
            id: uuidv4(), name: '', background: new Color('#ffffff').hsl(), foreground: new Color('#ffffff').hsl(), disabilities: []
        }
        mainColors.value.set(newc.id, newc)
        return newc as ColorCombination
    }

    const getColorVariantByID = computed(() => (id: string) => colorVariants.find(v => v.id === id) as ColorVariant)
    const getMainColorByID = computed(() => (id: string) => mainColors.value.get(id) as ColorCombination)
    const getColorVariantColorsByID = computed(() => (id: string) => {
        const variant = colorVariants.find(v => v.id === id) as ColorVariant
        const main = mainColors.value.get(variant.mainColorID) as ColorCombination
        return {
            foreground: `hsl(${main.foreground.hue() + variant.foregroundChanges[0]} ${main.foreground.saturationl() + variant.foregroundChanges[1]}% ${main.foreground.lightness() + variant.foregroundChanges[2]}%)`,
            background: `hsl(${main.background.hue() + variant.backgroundChanges[0]} ${main.background.saturationl() + variant.backgroundChanges[1]}% ${main.background.lightness() + variant.backgroundChanges[2]}%)`
        }
    })

    const mainColorList = computed(() => Array.from(mainColors.value).map(([a, b]) => b))

    const deleteVariantsByUser = (userID: string) => {
        let IDs = []
        let index = 1
        while (index > -1) {
            index = colorVariants.findIndex(v => v.userID === userID)
            if (index > -1) {
                IDs.push(colorVariants[index].id)
                colorVariants.splice(index, 1)
            }
        }
        return IDs
    }

    const deleteMainColor = (colorID: string) => {
        mainColors.value.delete(colorID)
        let IDs = []
        let index = 1
        while (index > -1) {
            index = colorVariants.findIndex(v => v.mainColorID === colorID)
            if (index > -1) {
                IDs.push(colorVariants[index].id)
                colorVariants.splice(index, 1)
            }
        }
        return IDs
    }
    const deleteVariantByID = (variantID: string) => {
        const index = colorVariants.findIndex(v => v.id === variantID)
        if (index > -1) {
            colorVariants.splice(index, 1)
        }

    }

    return {
        mainColors,
        colorsByUser,
        mainColorList,
        getMainColorByID,
        getColorVariantByID,
        getColorVariantColorsByID,
        deleteVariantsByUser,
        deleteVariantByID,
        createColorVariant,
        modifyColorVariant,
        deleteMainColor,
        newColor,
        addColor,
    }
})
