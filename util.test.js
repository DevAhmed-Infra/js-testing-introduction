const puppeteer = require('puppeteer');
const path = require('path');
const { generateText , checkAndGenerate } = require("./util");

test('should give us name and age' , () => {
    const text = generateText('Ahmed' , 21);
    expect(text).toBe('Ahmed (21 years old)');
})

test('should give us date-less text' , () => {
    const text = generateText();
    expect(text).toBe('undefined (undefined years old)');
})

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Ahmed', 21);
  expect(text).toBe('Ahmed (21 years old)')
});


test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: true,

  });
  const page = await browser.newPage();
  const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
  await page.goto(filePath);
  await page.click('input#name');
  await page.type('input#name', 'Ahmed');
  await page.click('input#age');
  await page.type('input#age', '21');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Ahmed (21 years old)');
  await browser.close();
}, 10000);