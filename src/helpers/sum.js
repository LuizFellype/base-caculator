import bases from "base-converter";

export const supportedBases = {
    2: '2',
    8: '8',
    10: '10',
    16: '16',
}

export const sumBase = (base) => {
    return (x, y) => {
        if (base === supportedBases['2']) {
            const xInDec = bases.binToDec(x)
            const yInDec = bases.binToDec(y)
            
            const sumResult =  Number(xInDec) + Number(yInDec)
            return bases.decToBin(sumResult)
        } else if (base === supportedBases['8']) {
            const xInDec = bases.octToDec(x)
            const yInDec = bases.octToDec(y)
            
            const sumResult =  Number(xInDec) + Number(yInDec)
            return bases.decToOct(sumResult)
        } else if (base === supportedBases['10']) {
            const xInDec = x
            const yInDec = y
            
            const sumResult =  Number(xInDec) + Number(yInDec)
            return sumResult
        } else if (base === supportedBases['16']) {
            const xInDec = bases.hexToDec(x)
            const yInDec = bases.hexToDec(y)
            
            const sumResult =  Number(xInDec) + Number(yInDec)
            
            return bases.decToHex(sumResult).toUpperCase()
        }
    }
}

export const sum16 = sumBase('16')
export const sum10 = sumBase('10')
export const sum8 = sumBase('8')
export const sum2 = sumBase('2')
