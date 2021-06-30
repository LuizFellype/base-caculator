import {
    sum16,
} from "./sum";
import bases from "base-converter";
import * as R from "ramda";

import { translateApC } from "./apendiceC";

const instructions = {
    '11A1': '(LOAD) Reg 1 = Memo A1',
    '12A2': '(LOAD) Reg 2 = Memo A2',
    '2043': '(LOAD) Reg 0 = 43',
    '30A3': '(STORE) Memo A3 = Reg 0',
    '40A4': '(MOVE(copy)) Reg 4 = Reg A',
    '5012': '(ADD) Reg 0 = Bin(Reg 1) + Bin(Reg 2)',
    '634E': '(ADD) Reg 3 = Bin(Reg 4) + Bin(Reg E)',
    'C000': '(HALT) Para o programa.'
}


// test('Translate Apendice C instructions', () => {
//     expect(translateApC('11A1')).toEqual(instructions['11A1']);
//     expect(translateApC('12A2')).toEqual(instructions['12A2']);
//     expect(translateApC('2043')).toEqual(instructions['2043']);
//     expect(translateApC('30A3')).toEqual(instructions['30A3']);
//     expect(translateApC('40A4')).toEqual(instructions['40A4']);
//     expect(translateApC('5012')).toEqual(instructions['5012']);
//     expect(translateApC('634E')).toEqual(instructions['634E']);
//     expect(translateApC('C000')).toEqual(instructions['C000']);

// });

const getMemoryTable = (firstMemoryAddressName, memories) => {
    return memories.reduce((acc, memory, idx) => {
        const memoryKey = sum16(firstMemoryAddressName, bases.decToHex(idx))

        return { ...acc, [memoryKey]: memory }
    }, {})
}


test('Mount Apendice C table', () => {
    const memories = ['15', '6C', '16', '6D', '50', '56', '30', '6E', 'C0', '00',]
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

    expect(getMemoryTable('A0', memories)).toEqual(memoryTable);
});

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

        const [operationCode, registrator, x, y] = apCCommnad

        if (operationCode === 'B') {
            if (acc.registrators[registrator] == acc.registrators['0']) {

                return {}
            }
        }
        const ci = sum16(memoryAddress, 2)

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

const memoriesSum = ['20', '02', '21', '00', '22', '01', 'B1', '3C', '51', '12', 'B0', '36', 'C0', '00',]
const memoriesSumTable = {
    "30": "20",
    "31": "02",
    "32": "21",
    "33": "00",
    "34": "22",
    "35": "01",
    "36": "B1",
    "37": "3C",
    "38": "51",
    "39": "12",
    "3A": "B0",
    "3B": "36",
    "3C": "C0",
    "3D": "00",
}
const normalizeMemoriesTable = (memoriesTable) => {
    const memoTableEntries = Object.entries(memoriesTable)
    const splittedIn2 = R.splitEvery(2, memoTableEntries)

    const memoryTableNormalized = splittedIn2.reduce((acc, item) => {
        const [[firstKey, firstHalfCommandValue], [secondKey, secondHalfCommandValue]] = item

        return { ...acc, [firstKey]: `${firstHalfCommandValue}${secondHalfCommandValue}` }
    }, {})
    
    return memoryTableNormalized
}
test('Normalize memories table', () => {
    expect(normalizeMemoriesTable(memoriesSumTable)).toEqual({
        '30': '2002',
        '32': '2100',
        '34': '2201',
        '36': 'B13C',
        '38': '5112',
        '3A': 'B036',
        '3C': 'C000',
    })
})

test('Resolve and store history of Apendice C execution', () => {
    // expect(getMemoryTable('30', memoriesSum)).toEqual(memoriesSumTable)


    const validateToEnd = {
        "command": "B13C",
        "writtenCommand": translateApC("B13C"),
        // "ci": '36'
    }
    const sum = {
        "command": "5112",
        "writtenCommand": translateApC("5112"),
        // "ci": '38'
    }
    const returnToValidation = {
        "command": "B036",
        "writtenCommand": translateApC("B036"),
        // "ci": '3A'
    }

    // expect(runApendiceC('30', memoriesSumTable))
    //     .toEqual({
    //         memories: memoriesSumTable,
    //         registrators: {
    //             "0": "02",
    //             "1": "02",
    //             "2": "01",
    //         },
    //         history: [
    //             {
    //                 "command": "2002",
    //                 "writtenCommand": translateApC("2002"),
    //                 // "ci": '30'
    //             },
    //             {
    //                 "command": "2100",
    //                 "writtenCommand": translateApC("2100"),
    //                 // "ci": '32'
    //             },
    //             {
    //                 "command": "2201",
    //                 "writtenCommand": translateApC("2201"),
    //                 // "ci": '34'
    //             },
    //             validateToEnd,
    //             sum,
    //             returnToValidation,
    //             validateToEnd,
    //             sum,
    //             returnToValidation,
    //             validateToEnd,
    //             {
    //                 "command": "C000",
    //                 "writtenCommand": translateApC("C000"),
    //                 // "ci": '3E'
    //             },

    //         ],
    //         // ci: 'AA',
    //         hasStoped: true,
    //     });

});