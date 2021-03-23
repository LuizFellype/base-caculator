import { 
    sum16,
    sum10,
    sum8,
    sum2 
} from "./sum";

test('Sum all data bases', () => {
    expect(sum16('F', 'F')).toBe('1E');
    expect(sum10(7, 7)).toBe(14);
    expect(sum8(7, 7)).toBe('16');
    expect(sum2('1010', '0011')).toBe('1101');
});