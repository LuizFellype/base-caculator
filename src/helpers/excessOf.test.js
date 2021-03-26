import { excessOf } from "./excessOf";

test('Calculate excess of numbers', () => {
    expect(excessOf(8, -5)).toEqual({ bin: '0011', baseOf: 4 });
});