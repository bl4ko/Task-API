// this is a test file
const caluclateTip = (total, tipPercent = 0.25) => {
    const tip = total * tipPercent;
    return total + tip;
}

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 200)
    })
}


module.exports = {
    caluclateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}