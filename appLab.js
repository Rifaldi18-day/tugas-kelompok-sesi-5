// appLab.js
const readline = require('readline');
const chalk = require('chalk');
const { bacaDataLab, simpanDataLab } = require('./labStorage');

// Setup interface terminal untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function tampilkanMenu() {
    console.log(chalk.cyan.bold('\n=================================================='));
    console.log(chalk.yellow.bold('      APLIKASI PENCATAT SUHU LAB KHUSUS       '));
    console.log(chalk.cyan.bold('=================================================='));
    console.log(chalk.white('1. Input Data Suhu Baru (1 Jam Sekali)'));
    console.log(chalk.white('2. Lihat Rekapan / Riwayat Suhu Hari Ini'));
    console.log(chalk.white('3. Keluar'));
    console.log(chalk.cyan.bold('--------------------------------------------------'));

    rl.question(chalk.green('Pilih menu (1/2/3): '), (pilihan) => {
        switch (pilihan.trim()) {
            case '1':
                inputSuhuBaru();
                break;
            case '2':
                tampilkanRekapan();
                break;
            case '3':
                console.log(chalk.magenta('\nTerima kasih! Data lab aman tersimpan. Bye!\n'));
                rl.close();
                break;
            default:
                console.log(chalk.red('Pilihan tidak valid, silakan pilih 1, 2, atau 3.'));
                tampilkanMenu();
                break;
        }
    });
}

// Fungsi untuk menangkap input data suhu dari penjaga lab
function inputSuhuBaru() {
    console.log(chalk.blue('\n--- INPUT DATA SUHU BARU ---'));
    
    rl.question('Masukkan Nama Petugas (Penjaga Lab): ', (petugas) => {
        rl.question('Pengukuran ke-berapa hari ini? (Contoh: 1, 2, dst): ', (pengukuranKe) => {
            rl.question('Masukkan Jam Pencatatan (Contoh: 08:00, 09:00): ', (jam) => {
                rl.question('Masukkan Suhu Ruangan (°C): ', (suhu) => {
                    
                    // Format data yang akan disimpan
                    const dataBaru = {
                        tanggal: new Date().toLocaleDateString('id-ID'),
                        jam: jam.trim(),
                        pengukuranKe: pengukuranKe.trim(),
                        suhu: parseFloat(suhu),
                        petugas: petugas.trim()
                    };

                    // Simpan permanen lewat modul labStorage
                    simpanDataLab(dataBaru);

                    console.log(chalk.green('\n[SUKSES] Data suhu berhasil disimpan permanen!'));
                    tampilkanMenu();
                });
            });
        });
    });
}

// Fungsi untuk menampilkan rekapan data yang sudah tersimpan
function tampilkanRekapan() {
    console.log(chalk.blue('\n--- REKAPAN DATA SUHU LAB TER-SIMPAN ---'));
    const semuaData = bacaDataLab();

    if (semuaData.length === 0) {
        console.log(chalk.red('Belum ada data suhu yang tersimpan. Silakan input data terlebih dahulu.'));
        tampilkanMenu();
        return;
    }

    console.log(chalk.white(' No | Tanggal    | Jam   | Pengukuran Ke- | Suhu (°C) | Petugas'));
    console.log(chalk.cyan('------------------------------------------------------------------'));

    semuaData.forEach((item, index) => {
        console.log(chalk.green(` ${index + 1}. | ${item.tanggal} | ${item.jam}  | Ke-${item.pengukuranKe.padEnd(11)} | ${item.suhu} °C    | ${item.petugas}`));
    });

    console.log(chalk.cyan('------------------------------------------------------------------'));
    tampilkanMenu();
}

// Jalankan program
tampilkanMenu();