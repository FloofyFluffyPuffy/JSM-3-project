import axios from "axios"
import { Anime } from "../type"
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra"; // use extra for use to work
export const searchCardScript = async (input: string) => {
    const data: Anime[] = []
    const browser = await puppeteer.launch({ headless: true });
    try {
        const cleanInput = input.toLowerCase().trim()
        const searchWord = encodeURIComponent(cleanInput)
        const endPoint = `https://9animetv.to/search?keyword=${searchWord}`
         const request = await axios.get(endPoint);
         const $ = cheerio.load(request.data);
             $(".film_list-wrap > .flw-item").slice(0, 5).each((i, e) => {
      const title =
        $(e).find("h3.film-name a").text().trim() || "Unknown Title";
      const image = $(e).find("img").attr("data-src") || "No Image Found";
      const newEp = $(e).find(".tick-eps").text().trim() || "Ep ?";
      const SD = $(e).find(".tick-sub").text().trim() || "Unknown";
      const href = $(e).find(".film-name > a").attr("href") || "Unknown"
      data.push({
        title,
        image,
        newEp,
        SD,
        href,
      });
      console.log(data)
    });
    }
    catch (error){
        console.log(error);
    }
      return data;
}
