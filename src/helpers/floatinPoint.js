import bases from "base-converter";


export const floatinPoint = (bin) => {
    const signal = bin[0]
    const exp = bin.slice(1, 4)
    const mantissa = bin.slice(4)

    const numOfExp = bases.binToDec(exp)
    const baseOf = 4
    
    const numberIsPositive = Number(signal) === 0

    const diff = numOfExp - baseOf   
    const amountOfPointJumps = numberIsPositive ? 
        (diff > 0 ? diff : diff*-1) : 
        (diff < 0 ? diff : diff*-1)

    const binFractionRes = diff >= 0 ? 
        `${mantissa.slice(0, amountOfPointJumps)}.${mantissa.slice(amountOfPointJumps)}` : 
        `.${'0'.repeat(amountOfPointJumps)}${mantissa}`
    
    return { bin: binFractionRes, isPositive: numberIsPositive }
}