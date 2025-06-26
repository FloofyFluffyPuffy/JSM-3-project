import axios from "axios";
import * as cheerio from "cheerio";
export interface Anime {
  title: string;
  image: string;
  newEp: string;
  SD: string;
}
export const nineAnime = async (searchTerm: string): Promise<Anime[]> => { //accept searchTerm from scrapper
  const data: Anime[] = [];
  try {
const cleanTerm = (searchTerm || "").toLowerCase().trim(); // clean stuf flike "   sasaki"
const searchWord = encodeURIComponent(cleanTerm);

const endPoint = cleanTerm.length > 0 // use cleanTerm cuz if no searchTerm passed from searchBar = undefined
  ? `https://9animetv.to/search?keyword=${searchWord}`
  : `https://9animetv.to/recently-updated`;
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

      data.push({
        title,
        image,
        newEp,
        SD,
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
