import {
    sum16,
} from "./sum";

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

test('Resolve and store history of Apendice C execution', () => {
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
    expect(getMemoryTable('A0', memories)).toEqual(memoryTable);
    
});