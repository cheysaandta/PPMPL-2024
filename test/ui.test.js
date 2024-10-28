const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('file:///Users/ceyshaanindita/Documents/Semester%205/PPMPL/ppmpl4/selenium-ui-test/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
        await usernameField.sendKeys('testuser'); // Menggunakan username yang benar

        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
        await passwordField.sendKeys('password123'); // Menggunakan password yang benar
    });

    it('should click the login button', async function() {
        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 10000);
        await loginButton.click();

        // Tunggu hingga elemen errorMessage muncul (jika login gagal)
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000);
        
        // Cek apakah errorMessage tidak terlihat (karena kredensial yang benar)
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        expect(isErrorMessageDisplayed).to.be.false; // Pastikan pesan kesalahan tidak muncul
    });

    it('should fail login with invalid credentials', async function() {
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
        await usernameField.clear(); // Menghapus input sebelumnya
        await usernameField.sendKeys('wronguser'); // Menggunakan username yang salah

        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
        await passwordField.clear(); // Menghapus input sebelumnya
        await passwordField.sendKeys('wrongpassword'); // Menggunakan password yang salah

        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 10000);
        await loginButton.click();

        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000);
        
        // Cek apakah errorMessage terlihat (karena kredensial yang salah)
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();
        expect(isErrorMessageDisplayed).to.be.true; // Pastikan pesan kesalahan muncul
    });

    it('should input username and password using CSS and XPath', async function() {
        const usernameField = await driver.findElement(By.css('#username'));
        await usernameField.clear(); // Menghapus input sebelumnya
        await usernameField.sendKeys('testuser');

        const passwordField = await driver.findElement(By.xpath('//*[@id="password"]'));
        await passwordField.clear(); // Menghapus input sebelumnya
        await passwordField.sendKeys('password123');
    });

    it('should verify login button is visible', async function() {
        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 10000);
        const isLoginButtonDisplayed = await loginButton.isDisplayed();
        expect(isLoginButtonDisplayed).to.be.true; // Pastikan tombol login terlihat
    });
});
