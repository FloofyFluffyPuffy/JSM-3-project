
import axios from "axios";
import * as cheerio from "cheerio";
export const watch = async() => {

  const request = await axios.get(`https://9animetv.to/watch/`)
  const $ = cheerio.load(request.data)
}

export default watch