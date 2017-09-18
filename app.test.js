

function multi(num1, num2) {
    return num1 * num2;
}

describe("this is describing things", function(){
    test('testing multi method', function(){
        expect(multi(9,9)).toBe(81)
    });

    test('testing negative numbers method', function(){
        expect(multi(-3,9)).toBe(-27)
    });
})