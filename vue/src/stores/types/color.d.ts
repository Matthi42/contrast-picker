import Color from "color"

type ColorCombination = {
    id: string,
    name: string,
    foreground: Color,
    background: Color,
    disabilities: string[]
}
type ColorCombinationSerialized = {
    id: string,
    name: string,
    foreground: string,
    background: string,
    disabilities: string[]
}

type ColorVariant = {
    id: string,
    mainColorID: string,
    userID: string,
    foregroundChanges: [number, number, number],
    backgroundChanges: [number, number, number],
    finishedTest: boolean
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