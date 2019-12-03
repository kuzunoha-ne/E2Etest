import puppeteer from 'puppeteer';

let browser:puppeteer.Browser;
let page:puppeteer.Page;

// テストを実施する前処理
beforeAll(async ()=>{
    browser = await puppeteer.launch({
        headless:false,
        slowMo:18,
    });
    page = await browser.newPage();
});

// 一つのテスト項目実施する直前に都度実施する処理
beforeEach(async ()=>{
    await page.goto('http://127.0.0.1:8080');
});

// 一つのテスト項目実施した直後に都度実施する処理
afterEach(async () => {
});

// テストすべて終了後の処理
afterAll(async () => {
    await page.close();
    await browser.close();
});

test('ボタンを押したらhogehogeと表示する。', async()=>{
    await page.waitFor('#hello');
    page.on('dialog', async dialog => {
        await dialog.dismiss()
        expect(dialog.message()).toBe('hogehoge');
    });
    await page.click('#hello');
});


test('Googleジャンプしますを押すとGoogleへリンクする', async()=>{
    await page.waitFor('#link');
    page.on('response', response => {
        expect(response.url()).toBe('https://www.google.com/');
    });
    await page.click('#link');
});
