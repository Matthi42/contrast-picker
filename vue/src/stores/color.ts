import Color from "color";
import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import { ColorCombination, ColorCombinationSerialized, ColorVariant, UserColors } from "./types/color";
import { v4 as uuidv4 } from 'uuid'

const serializeColor = (color: Color) => color.hsl().string()
const deSerializeColor = (color: string) => Color(color).hsl()


export const useColorStore = defineStore('color', () => {
    const mainColors = reactive([] as ColorCombination[])
    const colorVariants = reactive([] as ColorVariant[])

    Neutralino.storage.getData('main-colors').then(c => {
        Object.assign(mainColors, reactive(
            JSON.parse(c).map((c: ColorCombinationSerialized) => ({
                id: c.id,
                name: c.name,
                foreground: deSerializeColor(c.foreground),
                background: deSerializeColor(c.background),
            })) as ColorCombination[]
        ))
    })
    Neutralino.storage.getData('color-variants').then(c => {
        Object.assign(colorVariants, reactive(JSON.parse(c) as ColorVariant[]))
    })
    watch(mainColors, async (newVal, oldVal) => {
        await Neutralino.storage.setData(
            'main-colors',
            JSON.stringify(newVal.map(c => ({
                id: c.id,
                name: c.name,
                foreground: serializeColor(c.foreground),
                background: serializeColor(c.background), 
            })))
        )
    })
    watch(colorVariants, async (newVal, oldVal) => {
        await Neutralino.storage.setData('color-variants', JSON.stringify(newVal))
    })

    const colorsByUser = computed(() => (userID: string) =>
        mainColors.map(c => ({
            id: c.id,
            name: c.name,
            foreground: c.foreground.hsl().string(),
            background: c.background.hsl().string(),
            variants: colorVariants
                .filter((v) => v.mainColorID === c.id && userID === v.userID)
                .map((v) => ({
                    id: v.id,
                    // TODO: validation
                    foreground: `hsl(${c.foreground.hue() + v.foregroundChanges[0]} ${c.foreground.saturationl() + v.foregroundChanges[0]}% ${c.foreground.lightness() + v.foregroundChanges[2]}%)`,
                    background: `hsl(${c.background.hue() + v.backgroundChanges[0]} ${c.background.saturationl() + v.backgroundChanges[0]}% ${c.background.lightness() + v.backgroundChanges[2]}%)`
                }))
        })) as UserColors
    )
    const createColorVariant = (userID: string, combinationID: string) => {
        colorVariants.push({
            id: uuidv4(),
            mainColorID: combinationID,
            userID: userID,
            foregroundChanges: [0, 0, 0],
            backgroundChanges: [0, 0, 0]
        })
    }

    const modifyColorVariant = (newVal: ColorVariant) => {
        colorVariants[colorVariants.findIndex((e) => e.id === newVal.id)] = newVal
    }

    const getColorVariantByID = computed(() => (id: string) => colorVariants.find(v => v.id === id) as ColorVariant)

    return {
        colorsByUser,
        getColorVariantByID,
        createColorVariant,
        modifyColorVariant,
    }
})