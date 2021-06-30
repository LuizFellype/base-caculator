
export const translateApC = (instruction) => {
    const [command, registrator, x, y] = instruction
    
    return {
        '1': `(LOAD) Reg ${registrator} = Memo ${x}${y}`,
        '2': `(LOAD) Reg ${registrator} = ${x}${y}`,
        '3': `(STORE) Memo ${x}${y} = Reg ${registrator}`,
        '4': `(MOVE(copy)) Reg ${y} = Reg ${x}`,
        '5': `(ADD) Reg ${registrator} = Bin(Reg ${x}) + Bin(Reg ${y})`,
        '6': `(ADD) Reg ${registrator} = PontoFlutuante(Reg ${x}) + PontoFlutuante(Reg ${y})`,
        '7': `(OR) Reg ${registrator} = Bin(Reg ${x}) OR Bin(Reg ${y})`,
        '8': `(OR) Reg ${registrator} = Bin(Reg ${x}) AND Bin(Reg ${y})`,
        '9': `(XOR) Reg ${registrator} = Bin(Reg ${x}) XOR Bin(Reg ${y})`,
        'A': `(ROTATE) Bin(Reg ${registrator}), gira ${y} digitos da esquerda para a direita e salva no Reg ${registrator}`,
        'B': `(JUMP) se (Reg ${registrator} == Reg 0), então próxima instrução será ${x}${y}, se não apenas continua. `,
        'C': `(HALT) Para o programa.`,
    }[command]
}

