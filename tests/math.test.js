// Why test?
//
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//      - Refractoring
//      - Collaborating
//      - Profilining
// - Peace of mind


// test() function provided by jest
// When jest runs test function if function throws error ->  failure
//                             else                     ->  success

// test('Hello world!', () => {

// })

// test('This should fail', () => {
//     throw new Error('Failure');
// })


const { caluclateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = caluclateTip(10, .3);
    expect(total).toBe(13);
})

test('Should calculate total with default tip', () => {
    const total = caluclateTip(10);
    expect(total).toBe(12.5);
})

test('Should convert 32F to 0C', () => {
    const celsius = fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
})

test('Should convert 0 to 32', () => {
    const fahrenheit = celsiusToFahrenheit(0);
    expect(fahrenheit).toBe(32);
})


test('Should add two numbers async/await', async () => {
    const sum = await add(2,3);
    expect(sum).toBe(5);
})