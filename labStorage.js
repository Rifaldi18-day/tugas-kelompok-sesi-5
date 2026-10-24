// labStorage.js
const fs = require('fs');
const FILE_NAME = 'database_suhu.json';

// Fungsi untuk membaca data yang sudah tersimpan
function bacaDataLab() {
    if (!fs.existsSync(FILE_NAME)) {
        return []; // Kalau file belum ada, kembalikan array kosong
    }
    const dataBuffer = fs.readFileSync(FILE_NAME);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
}

// Fungsi untuk menyimpan data baru ke file
function simpanDataLab(dataBaru) {
    const dataLama = bacaDataLab();
    dataLama.push(dataBaru);
    fs.writeFileSync(FILE_NAME, JSON.stringify(dataLama, null, 2));
}

module.exports = { bacaDataLab, simpanDataLab };