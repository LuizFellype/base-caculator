import bases from "base-converter";
import { Fraction } from "fractional";

export const floatinPoint = (bin) => {
    const signal = bin[0]
    const exp = bin.slice(1, 4)
    const mantissa = bin.slice(4)

    const numOfExp = bases.binToDec(exp)
    const baseOf = 4
    
    const numberIsPositive = Number(signal) === 0

    const diff = numOfExp - baseOf   
    const amountOfPointJumps = diff >= 0 ? diff : diff * -1

    const binFractionRes = diff >= 0 ? 
        `${mantissa.slice(0, amountOfPointJumps)}.${mantissa.slice(amountOfPointJumps)}` : 
        `.${'0'.repeat(amountOfPointJumps)}${mantissa}`
    
    return { bin: binFractionRes, isPositive: numberIsPositive }
}

export const convertFLoatingPoint = (floatBin) => {
    const fracByPosition = [
        1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128
    ]
    const splited = floatBin.split('')
    
    return splited.reduce((acc, n, idx) => {
        return Number(n) === 1 ? 
            new Fraction(fracByPosition[idx]).add(new Fraction(acc)).toString() : 
            acc
    }, 0/1)
}

export const binToDec = (bin) => {
    const binSplitted = bin.split('.')
    
    if (binSplitted.length === 2) {
        const binDec = binSplitted[0].length ? binSplitted[0] : '0' 
        return `${bases.binToDec(binDec)} ${convertFLoatingPoint(binSplitted[1])}` 
    } else {
        return bases.binToDec(binSplitted[0])
    }
}


export const binToFloatinPoint = (binFrac, positive = true) => {
    const base = positive ? '0' : '1'
    const idxFirst1 = binFrac.indexOf('1')
    const idxDot = binFrac.indexOf('.')
    const cleanBinFrac = binFrac.replace('.', '')
    const slicedToMantissa = cleanBinFrac.slice((idxFirst1 === 0 ? 1 : idxFirst1) - 1)
    const mLen = slicedToMantissa.length
    
    const diff = 4 - mLen
    
    const mantissa = mLen <= 4 ? `${slicedToMantissa}${'0'.repeat(diff)}` : slicedToMantissa.slice(0, 4)
    
    const idxDiff = idxDot - idxFirst1
    const binToFindInExcessOf4 = idxDiff > 0 ? idxDiff : idxDiff + 1
    const numberToFindBin = binToFindInExcessOf4 >= 0 ? 4 + binToFindInExcessOf4 : 4 - (binToFindInExcessOf4 * -1)
    const bin = bases.decToBin(numberToFindBin)
    const binLen = bin.length

    const exp = 3 - binLen > 0 ? `${'0'.repeat(3 - binLen)}${bin}` : bin
    
    // console.log({  idxFirst1, idxDot, cleanBinFrac, slicedToMantissa, mantissa })
    // console.log({ idxDiff, binToFindInExcessOf4, numberToFindBin, exp, binLen, })
    // console.log('----------------------------')
    return `${base}${exp}${mantissa}`
}