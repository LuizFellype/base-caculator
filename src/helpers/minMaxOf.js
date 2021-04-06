import bases from 'base-converter'

export const minMaxOfBase = (baseLen) => {
    const maxBin = '1'.repeat(baseLen - 1)
    const max = bases.binToDec(maxBin)
    const min = -max - 1
    return { min, max }
}
export const minMaxOfExcess = (excessOf) => {
    const excessBin = bases.decToBin(excessOf)
    const excessBinLen = excessBin.length
    const maxFrom0 = bases.binToDec('1'.repeat(excessBinLen))
    const max = maxFrom0 - excessOf
    const min = -max - 1
    return { min, max }
}