import puppeteer from "puppeteer";

export const getNewIframe = async (href: string) => {
  let newIframe: string | null = '';
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const endPoint = `https://9animetv.to/watch/${href}`;
    await page.goto(endPoint, { waitUntil: "networkidle0" });
    newIframe = await page.$eval(
      "#iframe-embed",
      (
        el // IF THIS TYPE ISNT CORRECT WE CANT GET iframe
      ) => el.getAttribute("src")
    );
  } catch (error) {
    console.error("failed scraping iframe");
  }
  finally {
    if (browser) await browser.close();
  }
  return newIframe;
};
