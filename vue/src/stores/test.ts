import { defineStore } from "pinia";
import { computed, reactive, ref, Ref, watch } from "vue";

// a Store for all users
export const useTestStore = defineStore('test', () => {
    const currentTest = ref(undefined) as Ref<string | undefined>
    const tests = reactive(new Map() as testMap)
    const testIDs = reactive([] as string[])
    const mistakeMade = new Promise(() => {})

    // data from key-value store is loadet into store
    const promise = Neutralino.storage.getData('tests').then(v => {
        Object.assign(testIDs, reactive(JSON.parse(v) as string[]))
        testIDs.forEach((async id => {
            await Neutralino.storage.getData('test' + id).then(testValue => {
                const parsedTest = JSON.parse(testValue) as test
                tests.set(parsedTest.id, parsedTest)
            })
        }))
    })
    // if data changes the persistet values are updated
    /* watch(testIDs,async (newVal, oldVal) => {
         await Neutralino.storage.setData('tests',JSON.stringify(newVal))
     }, { deep: true})
 
     
     1.
     oldVal:                                         NewVal:
     [{id: 1, result: 123}, {id: 2, result: 123}] -> [{id: 1, result: 123}, {id: 2, result: 124}]
     // The element with id=2 has changed and needs to be put in key value store
     =>  because all key of newVal are also in oldVal we need to check if every element of oldVal deepEquals the corresponding newVal element
         if it doesn't the new element is saved O(n)
     2.
     oldVal:                                         NewVal:
     [{id: 1, result: 123}, {id: 2, result: 123}] -> [{id: 1, result: 123}, {id: 2, result: 123}, {id: 3, result: 124}]
     // The element with id=3 has to be added because the id does not exist in oldVal
     => the object can simply be saved O(n)
 
     The save-algorithem can be improved, because there will be only one change at a time
     We can check if the chenge is of type 2 first and if its not deepCompere the objects
   
     watch(tests,async (newVal, oldVal) => {
         console.log('the testsMap has changed');
         testIDs.forEach( async newV => {
             console.log(oldVal);
             console.log(newVal);
             
             if(oldVal.get(newV)) {
                 if (JSON.stringify(newVal.get(newV)) !== JSON.stringify(oldVal.get(newV)))
                     await Neutralino.storage.setData('test' + newV, JSON.stringify(newVal.get(newV)))
             } else {
                 console.log('else zweig');
                 
                 await Neutralino.storage.setData('test' + newV, JSON.stringify(newVal.get(newV)))
             }
         })
     }, { deep: true})  */

    const startTest = async (testID: string) => {
        await promise
        currentTest.value = testID
        if (!testIDs.some(t => t === testID)) {
            //TODO connstruct the test
            const newTest = {
                id: testID,
                result: [1,2,3,4,5,6,7,8,9,10,11,12].map(i => 
                    i < 7 ?  Array(i).fill(0).map(_ => ({actualRotation: Math.floor(Math.random()*8)}))
                          : Array(6).fill(0).map(_ => ({actualRotation: Math.floor(Math.random()*8)}))
                ),
                currentPos: [0, 0],
            } as test
            testIDs.push(testID)
            tests.set(testID, newTest)
            try {
                await Neutralino.storage.setData('tests', JSON.stringify(testIDs))
            } catch (error) {
                console.error(error);
            }
            try {
                await Neutralino.storage.setData('test' + testID, JSON.stringify(newTest))
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * pos: [0,0]
     * [{x}]           -> length=1
     * [{ }{ }]        -> length=2
     * [{ }{ } }]      -> length=3
     * [{ }{ }{ }]     -> length=3
     * need to increment first index
     * 
     * pos: [1,0]
     * [{ }]           -> length=1
     * [{x}{ }]        -> length=2
     * [{ }{ } }]      -> length=3
     * [{ }{ }{ }]     -> length=3
     * nedd to increment second index
     * pos: [1,1]
     */
    const nextQuestion = async () => {
        const [row, colum] = [test.value.currentPos[0], test.value.currentPos[1]]
        const columLast = test.value.result[row].length - 1
        if(colum === columLast)
            (tests.get(currentTest.value as string) as test).currentPos = [row + 1, 0]
        else
        (tests.get(currentTest.value as string) as test).currentPos = [row, colum + 1]
        await Neutralino.storage.setData('test' + currentTest.value, JSON.stringify(tests.get(currentTest.value as string) as test))
    }

    const test = computed(() =>  tests.get(currentTest.value as string) as test)

    const setTest = async (value: number) => {
        console.log(value)
        const t = tests.get(currentTest.value as string) as test
        t.result[t.currentPos[0]][t.currentPos[1]].chosenRotation = value
        await Neutralino.storage.setData('test' + t.id, JSON.stringify(t))
    }

    const currentRotation = computed(() => {
        const c = test.value
        return c.result[c.currentPos[0]][c.currentPos[1]].actualRotation
    })

    const mistakesInLine = (line: {actualRotation:number, chosenRotation:number | undefined}[]): number => 
       line.map(l => l.actualRotation === l.chosenRotation).reduce((ac:any, c) => ac + c) as any / line.length

    //TODO: find good line-factor-function
    const lineFactor = (N: number) => N 

    const score = (t: test) => 
        t.result.reduce((ac, l, i) => i < t.currentPos[0] ? ac + mistakesInLine(l) * lineFactor(i + 1): ac,0 )
    
    const currentScore = computed(() => score(test.value))

        // TODO: the line is changed as soon as the end is reached 
    const mistakesInCurrentLine = computed(() => 
        test.value.result[test.value.currentPos[0]].map(l => 
            (l.actualRotation === l.chosenRotation || !l.chosenRotation) ? 0: 1
        ).reduce((ac:any, c) => ac + c) )
    
    const toManyMistakesInCurrentLine = () =>   mistakesInCurrentLine.value > Math.round(test.value.result[test.value.currentPos[0]].length / 2) - 1

    const deleteTest = async (id: string) => {
        // TODO implement
        tests.delete(id)
        await Neutralino.storage.setData('test' + id, undefined as any)
        const index = testIDs.indexOf(id)
        if (index > -1) 
            testIDs.splice(index, 1)
        await Neutralino.storage.setData('tests', JSON.stringify(testIDs))

    }

    return {
        toManyMistakesInCurrentLine,
        nextQuestion,
        deleteTest,
        startTest,
        setTest,
        score,
        test,
        tests,
        testIDs,
        currentTest,
        currentScore,
        currentRotation,
        mistakesInCurrentLine,
    }
})