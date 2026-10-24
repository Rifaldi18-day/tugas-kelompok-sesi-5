// konversiSuhu.js
const chalk = require('chalk');
const fs = require('fs'); // Modul Inti Node.js untuk kelola File System
const prosesRekapanSuhu = require('./riwayatSuhu');

// Data sampel suhu yang terdata (misal: suhu harian seminggu)
const dataSuhuKota = [25, 30, 28, 32, 22, 29, 31];

// Olah data menggunakan modul riwayatSuhu
const { data, statistik } = prosesRekapanSuhu(dataSuhuKota);

// 1. TAMPILAN DI TERMINAL
console.log(chalk.cyan('==========================================================='));
console.log(chalk.yellow('          REKAPAN DATA & STATISTIK KONVERSI SUHU          '));
console.log(chalk.cyan('==========================================================='));
console.log(chalk.white(' No | Celsius  | Fahrenheit | Reamur   | Kelvin'));
console.log(chalk.cyan('-----------------------------------------------------------'));

let isiFileTxt = "--- LAPORAN REKAPAN SUHU ---\n\n";

data.forEach((item, index) => {
    let baris = ` ${index + 1}. | ${item.celsius} °C     | ${item.fahrenheit} °F     | ${item.reamur} °R    | ${item.kelvin} K`;
    console.log(chalk.green(baris));
    isiFileTxt += baris + "\n";
});

console.log(chalk.cyan('-----------------------------------------------------------'));
console.log(chalk.magenta(`> Suhu Tertinggi  : ${statistik.max} °C`));
console.log(chalk.magenta(`> Suhu Terendah   : ${statistik.min} °C`));
console.log(chalk.magenta(`> Rata-rata Suhu  : ${statistik.avg} °C`));
console.log(chalk.cyan('==========================================================='));

// 2. SIMPAN HASIL REKAPAN KE FILE TEXT (Menggunakan Modul Inti 'fs')
isiFileTxt += `\n--- STATISTIK ---\n`;
isiFileTxt += `Suhu Tertinggi : ${statistik.max} °C\n`;
isiFileTxt += `Suhu Terendah  : ${statistik.min} °C\n`;
isiFileTxt += `Rata-rata Suhu : ${statistik.avg} °C\n`;

fs.writeFileSync('laporan_suhu.txt', isiFileTxt);
console.log(chalk.yellow('\n[SUCCESS] Laporan rekapan suhu berhasil disimpan ke file "laporan_suhu.txt"!\n'));