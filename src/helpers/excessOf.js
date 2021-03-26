import bases from "base-converter";

export const excessOf = (excessParam, numberToFindOut) => {
    const BIN_excessParam = bases.decToBin(excessParam)
    const baseOf = BIN_excessParam.length
    let BIN_numberFoundOut = bases.decToBin(excessParam + numberToFindOut) 
    
    if (BIN_numberFoundOut.length < baseOf) {
        const diff = baseOf - BIN_numberFoundOut.length
        BIN_numberFoundOut = `${'0'.repeat(diff)}${BIN_numberFoundOut}`  
    }

    return { 
        bin: BIN_numberFoundOut,
        baseOf 
    }
}
