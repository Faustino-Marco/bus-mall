import { chromium } from 'playwright';

const [outputPath = 'screenshots/before.png'] = process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

await page.goto('http://localhost:8080/bus-mall.html', { waitUntil: 'networkidle' });

// Drive to peak state: click 25 times to trigger the results chart
for (let i = 0; i < 25; i++) {
  await page.click('#imgOne');
  // Small pause so renderProducts() settles before the next click
  await page.waitForTimeout(80);
}

// Wait for Chart.js to finish rendering
await page.waitForTimeout(600);

await page.screenshot({ path: outputPath, fullPage: true });
console.log(`Screenshot saved to ${outputPath}`);

await browser.close();
