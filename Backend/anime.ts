import axios from "axios";
import * as cheerio from "cheerio";
export interface Anime {
  title: string;
  newEp: string;
  SD: string;
  image: string;
}
export const nineAnime = async (): Promise<Anime[]> => {
    const data : Anime[] = []
  try {
    const request = await axios.get("https://9anime.com.ro/");
    // console.log(request.data)
    const $ = cheerio.load(request.data);
    // turn data into cheerio objects
    $(".listupd > .excstf > article").each((i, e) => {
      const title = $(e)
        .find("div > a > div.tt")
        .contents() // get childrens , no remove content cuz if remove
        // then we compare the actual div which is node type 1, it no overlap type 3(text)
        .filter((index, node) => {
          return (node as any).nodeType === 3; // filter out the h2 cuz it type 1
          // ! node as any cuz property nodetype dont exist on element after i install @ts cheerio,axios,express
        })
        .text()
        .trim();
      const newEp = $(e).find(".bt > .epx").text().trim();
      const SD = $(e).find(".bt > .sb").text().trim();
      const image = $(e).find(".limit > img").attr("src") || "No Image Found";
      console.log(title);
      console.log(newEp);
      console.log(SD);
      console.log(image);
      data.push({
        title, newEp, SD, image
      })
    });
  } catch (error) {
    console.log(error)
  }
  return data
};
