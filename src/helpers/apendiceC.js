
export const translateApC = (instruction) => {
    const [command, registrator, x, y] = instruction

    return {
        '1': `(LOAD) Carrega o registrador ${registrator} com o padrão de bits encontrado na célula de memória no endereço ${x}${y}`,
        '2': `(LOAD) Carrega o valor ${x}${y} no registrador ${registrator}`,
        '3': `(STORE) Armazena o conteúdo do registrador ${registrator} na célula de memória de endereço ${x}${y}.`,
        '4': `(MOVE) Copia o conteúdo do registrador ${x} no registrador ${y}`,
        '5': `(ADD) Soma(binários) o conteúdo dos registradores ${x} e ${y} e salva no registrador ${registrator}.`,
        '6': `(ADD) Soma(ponto flutuante) o conteúdo dos registradores ${x} e ${y} e salva no registrador ${registrator}.`,
        '7': `(OR) reg ${registrator} = bin(reg ${x}) OR bin(reg ${y})`,
        '8': `(OR) reg ${registrator} = bin(reg ${x}) AND bin(reg ${y})`,
        '9': `(XOR) reg ${registrator} = bin(reg ${x}) XOR bin(reg ${y})`,
        'A': `(ROTATE) bin(reg ${registrator} em hex), gira ${y} digitos da esquerda para a direita e salva no reg ${registrator}`,
        'B': `(JUMP) se (reg ${registrator} == reg 0), então próxima instrução será ${x}${y}, se não apenas continua. `,
        'C': `(HALT) Para o programa.`,
    }[command]
}

