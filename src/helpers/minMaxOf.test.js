import { minMaxOfBase, minMaxOfExcess } from "./minMaxOf";

test('Calculate range(min-max) of numbers of a base', () => {
    expect(minMaxOfBase(4)).toEqual({ min: -8, max: 7 });
});
test('Calculate range(min-max) of numbers in excess of a number', () => {
    expect(minMaxOfExcess(8)).toEqual({ min: -8, max: 7 });
    expect(minMaxOfExcess(4)).toEqual({ min: -4, max: 3 });
});