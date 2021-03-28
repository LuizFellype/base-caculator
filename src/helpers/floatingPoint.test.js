import { floatinPoint } from "./floatinPoint";


test('Calculate Point of Float - base of 8', () => {
    expect(floatinPoint('01101011')).toEqual({ bin: '10.11', isPositive: true }); // 2 3/4
    expect(floatinPoint('00111100')).toEqual({ bin: '.01100', isPositive: true }); // 2 3/4
});