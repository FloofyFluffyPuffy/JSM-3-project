import axios from "axios";
import { Anime, SearchCard } from "../type";
import * as cheerio from "cheerio";
export const searchCardScript = async (input: string): Promise<SearchCard[]> => {
  // remember to add [] or get SearchCard type error "missing..."
  const data: SearchCard[] = [];
  try {
    const cleanInput = input.toLowerCase().trim();
    const searchWord = encodeURIComponent(cleanInput);
    const endPoint = input && cleanInput.length > 0 ? `https://9animetv.to/search?keyword=${searchWord}` : `https://9animetv.to/recently-updated`
    const request = await axios.get(endPoint);
    console.log("Input?:", input)
    const $ = cheerio.load(request.data);
    const batch1 = $(".film_list-wrap > .flw-item").slice(0, 5).get();
    console.log("Found cards:", batch1.length);
    for (const card of batch1) {
      const title =
        $(card).find("h3.film-name a").text().trim() || "Unknown Title";
      const image = $(card).find("img").attr("data-src") || "No Image Found";
      const newEp = $(card).find(".tick-eps").text().trim() || "Ep ?";
      const SD = $(card).find(".tick-sub").text().trim() || "Unknown";
      const href = $(card).find(".film-name > a").attr("href") || "Unknown";
      const request2 = await axios.get(`https://9animetv.to${href}`);
        const $$ = cheerio.load(request2.data);
        const aired = $$(".item-title:contains('Date aired')")
          .next()
          .text()
          .trim() || "Unknown";
        const type = $$(".item-title:contains('Type')").next().text().trim() || "Unknown"
        const duration = $$(".item-title:contains('Duration')")
          .next()
          .text()
          .trim() || "Unknown"
      data.push({
        title,
        image,
        newEp,
        SD,
        href,
        aired,
        type,
        duration,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
