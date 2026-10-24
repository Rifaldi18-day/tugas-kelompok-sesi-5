// riwayatSuhu.js
const { celsiusToFahrenheit, celsiusToReamur, celsiusToKelvin } = require('./rumusSuhu');

// Memproses daftar suhu Celsius dan mengembalikannya bersama statistik
function prosesRekapanSuhu(daftarCelsius) {
    // Mapping konversi
    let hasilRekapan = daftarCelsius.map(celsius => {
        return {
            celsius: celsius,
            fahrenheit: celsiusToFahrenheit(celsius),
            reamur: celsiusToReamur(celsius),
            kelvin: celsiusToKelvin(celsius)
        };
    });

    // Hitung Statistik
    let max = Math.max(...daftarCelsius);
    let min = Math.min(...daftarCelsius);
    let total = daftarCelsius.reduce((acc, curr) => acc + curr, 0);
    let avg = (total / daftarCelsius.length).toFixed(1);

    return {
        data: hasilRekapan,
        statistik: { max, min, avg }
    };
}

module.exports = prosesRekapanSuhu;