import { floatinPoint, convertFLoatingPoint } from "./floatinPoint";

test('Calculate Point of Float', () => {
    expect(convertFLoatingPoint('101')).toBe('5/8');
    expect(convertFLoatingPoint('01')).toBe('1/4');
})

test('Decode bits patterns to floating point - base of 8', () => {
    expect(floatinPoint('01101011')).toEqual({ bin: '10.11', isPositive: true }); // 2 3/4
    expect(floatinPoint('11101011')).toEqual({ bin: '10.11', isPositive: false }); // 2 3/4
    
    expect(floatinPoint('00111100')).toEqual({ bin: '.01100', isPositive: true }); // 2 3/4
});