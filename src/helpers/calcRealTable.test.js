import { calcRealtTable, getPremiseRealTableByNumber, getWrittenEquation } from "./calcRealTable";
import { operators } from "./operators"

const premisesTable = {
    a: [true, true, false, false],
    b: [true, false, true, false,],
    '~a': [false, false, true, true],
    '~b': [false, true, false, true,],
}

test('Calculate real table', () => {
    expect(getPremiseRealTableByNumber(['a', 'b'])).toEqual(premisesTable);

    const equation = { p1: 'a', operator: operators['^'], p2: 'b' }
    expect(calcRealtTable(premisesTable)([equation])).toEqual(
        { 
            [`(${getWrittenEquation(equation)})`]: [true, false, false, false], 
        },
    );
});