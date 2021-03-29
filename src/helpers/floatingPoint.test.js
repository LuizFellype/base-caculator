import { floatinPoint, convertFLoatingPoint, binToFloatinPoint } from "./floatinPoint";

test('Calculate decimal fraction FROM francional bin', () => {
    expect(convertFLoatingPoint('101')).toBe('5/8');
    expect(convertFLoatingPoint('01')).toBe('1/4');
})

test('Decode floating point(base of 8) TO fractional bin', () => {
    expect(floatinPoint('01101011')).toEqual({ bin: '10.11', isPositive: true }); // 2 3/4
    expect(floatinPoint('11101011')).toEqual({ bin: '10.11', isPositive: false }); // 2 3/4
    
    expect(floatinPoint('00111100')).toEqual({ bin: '.01100', isPositive: true }); // 2 3/4
});

test('Decode fractional bin TO floating point(base of 8)', () => {
    expect(binToFloatinPoint('.011')).toBe('00111100');
    expect(binToFloatinPoint('1.001')).toBe('01011001');
})
