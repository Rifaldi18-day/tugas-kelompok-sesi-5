// rumusSuhu.js

// Konversi dari Celsius ke berbagai skala suhu
function celsiusToFahrenheit(c) {
    return (c * 9 / 5) + 32;
}

function celsiusToReamur(c) {
    return c * 4 / 5;
}

function celsiusToKelvin(c) {
    return c + 273.15;
}

module.exports = {
    celsiusToFahrenheit,
    celsiusToReamur,
    celsiusToKelvin
};