import Color from "color"

type ColorCombination = {
    id: string,
    name: string,
    foreground: Color,
    background: Color
}
type ColorCombinationSerialized = {
    id: string,
    name: string,
    foreground: string,
    background: string
}

type ColorVariant = {
    id: string,
    mainColorID: string,
    userID: string,
    foregroundChanges: [number, number, number],
    backgroundChanges: [number, number, number]
}


type UserColors = {
    id: string,
    name: string,
    foreground: string,
    background: string,
    variants: {
        id: string,
        foreground: string,
        background: string
    } []
} []