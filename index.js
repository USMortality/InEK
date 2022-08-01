const puppeteer = require('puppeteer')

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const urls = [
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sImxvc0dyb3VwIjpbXSwic2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwiYmVkQ2xhc3MiOltdLCJkaXNjaGFyZ2VGcm9tIjoiMjAyMS0wMy0xNSIsImRpc2NoYXJnZVRvIjoiMjAyMS0wMy0yMSJ9",
]

async function processUrl(page, url) {
  await page.goto(url)

  // Spinner
  await page.waitForSelector(
    'body > ngx-app > ngx-pages > ngx-one-column-layout > nb-layout > div > div > div > div > div > nb-layout-column > ngx-browser > div > div > nb-accordion > nb-accordion-item > nb-accordion-item-body > div > div > nb-card > nb-spinner > span',
    { hidden: true }
  )

  await page.click('#control-filterdata')

  await page.waitForSelector(
    'nb-card-body:nth-child(3)',
    { hidden: true }
  )

  const button = await page.$('#control-excel');
  await button.click()

  await page.waitForSelector(
    '#control-excel > nb-spinner > span',
    { hidden: true }
  )
  await page.waitForTimeout(1000)
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage()
  const url = 'https://datenbrowser.inek.org/DRG202201'
  await page.setViewport({ width: 1366, height: 768 })
  await page.setDefaultTimeout(120000)
  await page.goto(url)

  await page.waitForSelector('nb-card-footer > button.float-right')
  await page.click('nb-card-footer > button.float-right')

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`Processing ${i}, ${url}`)

    await processUrl(page, url)
    await page.waitForTimeout(10000)
  }

  await browser.close()
})()
