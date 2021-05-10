import {
    sum16,
} from "./sum";
import * as R from "ramda";

import { translateApC } from "./apendiceC";

const instructions = {
    '11A1': '(LOAD) Carrega o registrador 1 com o padrão de bits encontrado na célula de memória no endereço A1',
    '12A2': '(LOAD) Carrega o registrador 2 com o padrão de bits encontrado na célula de memória no endereço A2',
    '2043': '(LOAD) Carrega o valor 43 no registrador 0',
    '30A3': '(STORE) Armazena o conteúdo do registrador 0 na célula de memória de endereço A3.',
    '40A4': '(MOVE) Copia o conteúdo do registrador A no registrador 4',
    '5012': '(ADD) Soma(binários) o conteúdo dos registradores 1 e 2 e salva no registrador 0.',
    '634E': '(ADD) Soma(ponto flutuante) o conteúdo dos registradores 4 e E e salva no registrador 3.',
    'C000': '(HALT) Para o programa.'
}


test('Translate Apendice C instructions', () => {
    expect(translateApC('11A1')).toEqual(instructions['11A1']);
    expect(translateApC('12A2')).toEqual(instructions['12A2']);
    expect(translateApC('2043')).toEqual(instructions['2043']);
    expect(translateApC('30A3')).toEqual(instructions['30A3']);
    expect(translateApC('40A4')).toEqual(instructions['40A4']);
    expect(translateApC('5012')).toEqual(instructions['5012']);
    expect(translateApC('634E')).toEqual(instructions['634E']);
    expect(translateApC('C000')).toEqual(instructions['C000']);

});

const getMemoryTable = (firstMemoryAddressName, memories) => {
    return memories.reduce((acc, memory, idx) => {
        const memoryKey = sum16(firstMemoryAddressName, idx)

        return { ...acc, [memoryKey]: memory }
    }, {})
}

const memories = ['15', '6C', '16', '6D', '50', '56', '30', '6E', 'C0', '00']
const memoryTable = {
    'A0': '15',
    'A1': '6C',
    'A2': '16',
    'A3': '6D',
    'A4': '50',
    'A5': '56',
    'A6': '30',
    'A7': '6E',
    'A8': 'C0',
    'A9': '00',
}
const memoryTableNormalized = {
    'A0': '156C',
    'A2': '166D',
    'A4': '5056',
    'A6': '306E',
    'A8': 'C000',
}

const runApendiceC = (memoryTable, initicalRegistrators = {}) => { // TODO: normalize table
    const memoryNormalizedEntries = Object.entries(memoryTableNormalized)
    const initalState = {
        ci: memoryNormalizedEntries[0][0],
        registrators: initicalRegistrators,
        memories: memoryTable,
        history: [],
        hasStoped: false,
    }
    const apCExecuted = memoryNormalizedEntries.reduce((acc, [memoryAddress, apCCommnad], idx) => {
        if (acc.hasStoped) return acc

        const writtenCommand = translateApC(apCCommnad)
        const ci = sum16(memoryAddress, 2)

        const [operationCode, registrator, x, y] = apCCommnad
        const executionByOperationCode = {
            '1': { registrators: { [registrator]: memoryTable[`${x}${y}`] || '1' } },
            '2': { registrators: { [registrator]: `${x}${y}` } },
            '3': { memories: { [`${x}${y}`]: `${acc.registrators[registrator]}` } },
            // '4': `(MOVE) Copia o conteúdo do registrador ${x} no registrador ${y}`,
            '5': { registrators: { [registrator]: sum16(`${acc.registrators[x]}`, `${acc.registrators[y]}`) } },
            // '6': `(ADD) Soma(ponto flutuante) o conteúdo dos registradores ${x} e ${y} e salva no registrador ${registrator}.`,
            // '7': `(OR) reg ${registrator} = bin(reg ${x}) OR bin(reg ${y})`,
            // '8': `(OR) reg ${registrator} = bin(reg ${x}) AND bin(reg ${y})`,
            // '9': `(XOR) reg ${registrator} = bin(reg ${x}) XOR bin(reg ${y})`,
            // 'A': `(ROTATE) bin(reg ${registrator} em hex), gira ${y} digitos da esquerda para a direita e salva no reg ${registrator}`,
            // 'B': `(JUMP) se (reg ${registrator} == reg 0), então próxima instrução será ${x}${y}, se não apenas continua. `,
            'C': { hasStoped: true },
        }[operationCode]
        // console.log('----------- ',{ executionByOperationCode, apCCommnad, x, y, regs: acc.registrators  })

        return {
            ...acc, ci,
            history: [...acc.history, { command: apCCommnad, writtenCommand }],
            registrators: { ...acc.registrators, ...(executionByOperationCode.registrators || {}) },
            memories: { ...acc.memories, ...(executionByOperationCode.memories || {}) },
            hasStoped: !!executionByOperationCode.hasStoped
        }
    }, initalState)

    return apCExecuted
}

test('Resolve and store history of Apendice C execution', () => {
    expect(getMemoryTable('A0', memories)).toEqual(memoryTable);

    // sum two numbers
    expect(runApendiceC(memoryTable)).toEqual({
        memories: {
            "6E": "2",
            "A0": "15",
            "A1": "6C",
            "A2": "16",
            "A3": "6D",
            "A4": "50",
            "A5": "56",
            "A6": "30",
            "A7": "6E",
            "A8": "C0",
            "A9": "00",
        },
        registrators: {
            "0": "2",
            "5": "1",
            "6": "1",
        },
        history: [
            {
                "command": "156C",
                "writtenCommand": "(LOAD) Carrega o registrador 5 com o padrão de bits encontrado na célula de memória no endereço 6C",
            },
            {
                "command": "166D",
                "writtenCommand": "(LOAD) Carrega o registrador 6 com o padrão de bits encontrado na célula de memória no endereço 6D",
            },
            {
                "command": "5056",
                "writtenCommand": "(ADD) Soma(binários) o conteúdo dos registradores 5 e 6 e salva no registrador 0."
            },
            {
                "command": "306E",
                "writtenCommand": "(STORE) Armazena o conteúdo do registrador 0 na célula de memória de endereço 6E.",
            },
            {
                "command": "C000",
                "writtenCommand": "(HALT) Para o programa."
            },
        ],
        ci: 'AA',
        hasStoped: true,
    });
    // expect(normalizeMemoryTable(memoryTable)).toEqual(memoryTableNormalized);
});