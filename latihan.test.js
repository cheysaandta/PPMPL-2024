const { expect } = require('chai');
const { tambah, kali, kurang, bagi } = require('./math');

//Latihan 1

    // Test cases tambahan untuk fungsi pengurangan (kurang)
    describe('Pengujian Fungsi Kurang dengan Input Negatif', function() {
        it('seharusnya mengembalikan 0 saat mengurangkan -6 - -6', function() {
            expect(kurang(-6, -6)).to.equal(0);
        });
    });

    // Test cases tambahan untuk fungsi pembagian (bagi) dengan angka negatif
    describe('Pengujian Fungsi Bagi dengan Input Negatif', function() {
        it('seharusnya mengembalikan -2 saat membagi 8 / -4', function() {
            expect(bagi(8, -4)).to.equal(-2);
        });
        it('seharusnya mengembalikan error saat membagi dengan 0', function() {
            expect(() => bagi(6, 0)).to.throw('Tidak bisa membagi dengan nol');
        });
    });

//Latihan 2
    describe('Pengujian Fungsi Tambah dengan Input null atau string', function(){
        it('seharusnya mengembalikan error saat parameter null', function() {
            expect(() => tambah(null, 5)).to.throw('Masukkan angka');
            expect(() => tambah(5, null)).to.throw('Masukkan angka');
            expect(() => tambah(null, null)).to.throw('Masukkan angka');
        });
        it('seharusnya mengembalikan error saat parameter bukan angka', function() {
            expect(() => tambah('b', 5)).to.throw('Masukkan angka');
            expect(() => tambah(5, 's')).to.throw('Masukkan angka');
            expect(() => tambah('a', 'g')).to.throw('Masukkan angka');
        });
    });

    // Test cases tambahan untuk fungsi perkalian (kali) dengan angka negatif
    describe('Pengujian Fungsi Kali dengan Input Negatif', function() {
        it('seharusnya mengembalikan 24 saat mengkalikan -6 * -4', function() {
            expect(kali(-6, -4)).to.equal(24);
        });

        it('seharusnya mengembalikan -24 saat mengkalikan -6 * 4', function() {
            expect(kali(-6, 4)).to.equal(-24);
        });

        it('seharusnya mengembalikan -24 saat mengkalikan 6 * -4', function() {
            expect(kali(6, -4)).to.equal(-24);
        });
    });