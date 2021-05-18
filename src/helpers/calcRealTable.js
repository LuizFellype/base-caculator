import { operatePortLogic } from "./operators"

export const getPremiseRealTableByNumber = (premises) => {
    const premAmount = premises.length
    const linesAmount = Math.pow(2, premAmount) // + 1 for the label header

    const convertCharToBool = (string1and0) => {
        return string1and0
            .split('')
            .map(v => !!Number(v))
    }

    const allPremisesAndNegatives = premises.reduce((acc, premLabel, idx) => {
        const repeatValue = idx ? (linesAmount / 2) / (2 * idx) : linesAmount / 2
        const oneBlockOfValues = `${'1'.repeat(repeatValue)}${'0'.repeat(repeatValue)}`
        const premColumns = oneBlockOfValues.length === linesAmount ?
            convertCharToBool(oneBlockOfValues) :
            convertCharToBool(oneBlockOfValues.repeat(linesAmount / oneBlockOfValues.length))
        const premColumnsInverted = premColumns.map(bool => !bool)

        return { ...acc, [premLabel]: premColumns, [`~${premLabel}`]: premColumnsInverted }
    }, {})
    
    return Object.fromEntries(Object.entries(allPremisesAndNegatives).sort())
}

export const getWrittenEquation = (equation) => `${equation.p1} ${equation.operator} ${equation.p2}`

export const calcRealtTable = premRealTable => formatedEquations => {
    return formatedEquations.reduce((acc, equation) => {
        const result = premRealTable[equation.p1].map((prem1Bool, idx) => {
            return operatePortLogic(prem1Bool, equation.operator, premRealTable[equation.p2][idx])
        })

        return { ...acc, [`(${getWrittenEquation(equation)})`]: result }
    }, {})
}
