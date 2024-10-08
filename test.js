const { expect } = require('chai');
const { tambah, kali } = require('./math');
describe('Pengujian Fungsi Matematika', function() {
  it('seharusnya mengembalikan 4 saat menambahkan 2 + 2', function() {
    expect(tambah(2, 2)).to.equal(4);
  });
  it('seharusnya mengembalikan 6 saat mengalikan 2 * 3', function() {
    expect(kali(2, 3)).to.equal(6);
});
  it('seharusnya mengembalikan 0 saat mengurangkan 2 - 2', function() {
    expect(kurang(2, 2)).to.equal(0);
});


});