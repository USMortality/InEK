const puppeteer = require('puppeteer')

const urls = [
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTAtMDQiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTAtMTAifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTAtMTEiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTAtMTcifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTAtMTgiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTAtMjQifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTAtMjUiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTAtMzEifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTEtMDEiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTEtMDcifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTEtMDgiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTEtMTQifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTEtMTUiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTEtMjEifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTEtMjIiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTEtMjgifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTEtMjkiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTItMDUifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTItMDYiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTItMTIifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTItMTMiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTItMTkifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTItMjAiLCJhZG1pc3Npb25UbyI6IjIwMjEtMTItMjYifQ%3D%3D",
  "https://datenbrowser.inek.org/DRG202201?q=eyJhZ2VHcm91cCI6W10sImRyZyI6W10sImZ1cnRoZXJQcm9jZWR1cmUiOltdLCJmdXJ0aGVyU2Vjb25kYXJ5RGlhZ25vc2lzIjpbXSwibWFpbkRpYWdub3NpcyI6W10sInByb2NlZHVyZSI6W10sInNlY29uZGFyeURpYWdub3NpcyI6W10sImJlZENsYXNzIjpbXSwiYWRtaXNzaW9uRnJvbSI6IjIwMjEtMTItMjciLCJhZG1pc3Npb25UbyI6IjIwMjItMDEtMDIifQ%3D%3D",
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

  console.log('click')
  await page.click('#control-excel')

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
