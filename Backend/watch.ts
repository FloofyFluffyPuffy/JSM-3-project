import axios from "axios";
import * as cheerio from "cheerio";
import type { Episode, StreamData } from "./type";
import puppeteer from "puppeteer-extra"; // use extra for use to work

export const getStream = async (href: string): Promise<StreamData> => {
  // no need to declare like animeData[] = []
  // cuz we not using push then return cuz this not an array
  // nvm am doing interface thing it easier
  const data: StreamData = {
    title: "",
    image: "",
    status: "",
    type: "",
    desc: "",
    genres: [],
    aired: "",
    episodes: [],
    iframeSrc: "",
    score: "",
    duration: "",
    quality: "",
    views: "",
    studios: [],
    aliases:[],
  };
  // to make puppeteer.use work use pup-extra cuz typescript tweakin
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const endPoint = `https://9animetv.to/watch/${href}`;
    const request = await axios.get(endPoint);
    await page.goto(endPoint, { waitUntil: "networkidle0" });
    console.log("Scraping from:", endPoint);
    const $ = cheerio.load(request.data);
    const iframeSrc = await page.$eval(
      "#iframe-embed",
      (
        el: Element // IF THIS TYPE ISNT CORRECT WE CANT GET iframe
      ) => el.getAttribute("src")
    );
    const episodes: Episode[] = await page.$$eval(".ep-item", (el) => {
      return el.map((episode) => {
        const order = episode.getAttribute("data-number") || "";
        const id = episode.getAttribute("data-id") || "";
        const title = episode.getAttribute("title") || `Episode ${order}`;
        const href = episode.getAttribute("href") || "";
        return { order, id, title, href };
      });
    });

    const title = $(".film-name.dynamic-name").text().trim();
    const image = $(".film-poster-img").attr("src") || "";
    const status = $(".item-title:contains('Status')").next().text().trim();
    const type = $(".item-title:contains('Type')").next().text().trim();
    const desc = $(".shorting").text().trim();
    const score = $(".item-title:contains('Scores')").next().text().trim();
    const duration = $(".item-title:contains('Duration')").next().text().trim();
    const quality = $(".item-title:contains('Quality')").next().text().trim();
    const views = $(".item-title:contains('Views')").next().text().trim();
const aliasesText = $(".alias").text().trim();
const aliases = aliasesText.split(",").map(alias => alias.trim());
    const genres: string[] = [];
    $(".item-title:contains('Genre')")
      .next()
      .find("a")
      .each((i, el) => {
        genres.push($(el).text().trim());
      });
    const studios: string[] = [];
    $(".item-title:contains('Studios')")
      .next()
      .find("a")
      .each((i, el) => {
        studios.push($(el).text().trim());
      });

    const aired = $(".item-title:contains('Date aired')").next().text().trim();
    Object.assign(data, {
      title,
      image,
      status,
      type,
      desc,
      genres,
      aired,
      episodes,
      iframeSrc,
      score,
      duration,
      quality,
      views,
      studios,
      aliases
    });
  } catch (error) {
    console.error("Scraping failed:", error);
  } finally {
    if (browser) await browser.close();
  }

  return data;
};

export default getStream;
