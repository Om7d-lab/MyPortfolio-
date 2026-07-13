const path = require('path');
const { chromium } = require('playwright-core');

// Renders scripts/preview-card.html (1200x630) to preview.png at the repo root,
// used as the og:image / twitter:image for link unfurls.
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.join(__dirname, 'preview-card.html'));
  await page.waitForTimeout(500); // let web fonts settle
  await page.screenshot({ path: path.join(__dirname, '..', 'preview.png') });
  await browser.close();
  console.log('preview.png generated');
})();
