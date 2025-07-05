import axios from "axios";
import * as cheerio from "cheerio"; // All exports (default + named) as one object
import type { Anime } from "../type";
export const nineAnime = async (searchTerm?: string, page?: string): Promise<Anime[]> => { //accept searchTerm from scrapper
  const data: Anime[] = [];
  try {
const cleanTerm = (searchTerm || "").toLowerCase().trim(); // clean stuf flike "   sasaki"
const searchWord = encodeURIComponent(cleanTerm);
const endPoint =  searchTerm && cleanTerm.length > 0 // use cleanTerm cuz if no searchTerm passed from searchBar = undefined
  ? `https://9animetv.to/search?keyword=${searchWord}`
  : page? `https://9animetv.to/recently-updated?page=${page}` : `https://9animetv.to/recently-updated`; 
    const request = await axios.get(endPoint);
    // console.log(request.data)
    console.log("Search term:", searchTerm);
console.log("Endpoint:", endPoint);
    const $ = cheerio.load(request.data);
    // turn data into cheerio objects
    $(".film_list-wrap > .flw-item").each((i, e) => {
      const title =
        $(e).find("h3.film-name a").text().trim() || "Unknown Title";
      const image = $(e).find("img").attr("data-src") || "No Image Found";
      const newEp = $(e).find(".tick-eps").text().trim() || "Ep ?";
      const SD = $(e).find(".tick-sub").text().trim() || "Unknown";
      const href = $(e).find(".film-name > a").attr("href") || "Unknown"
      const totalPagesText = $(".ap__-input .btn-blank").last().text().trim(); // "of 201"
      const totalPages = parseInt(totalPagesText.replace("of", "").trim());
      data.push({
        title,
        image,
        newEp,
        SD,
        href,
        totalPages
      });
    });
  } catch (error) {
    console.log(error);
  }
  return data;
};

// .contents() // get childrens , no remove content cuz if remove
// // then we compare the actual div which is node type 1, it no overlap type 3(text)
// .filter((index, node) => {
//   return (node as any).nodeType === 3; // filter out the h2 cuz it type 1
//   // ! node as any cuz property nodetype dont exist on element after i install @ts cheerio,axios,express
// })
