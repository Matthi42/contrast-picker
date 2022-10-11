type test = {
    id: string,
    result: {
        actualRotation:number, 
        chosenRotation:number | undefined
    }[][],
    currentPos: [number, number],
}

type testMap = Map<string, test>