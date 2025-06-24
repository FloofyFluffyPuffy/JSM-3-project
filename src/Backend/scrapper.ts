
import express, { Request, Response } from "express";
import { nineAnime } from "./anime";
const app = express();

app.get("/", async (req: Request, res: Response): Promise<void> => { //async = web wait for data, or script run without data and explode
  // is root url localhost.....
  // !  res.status().json() sends the response and returns a Response object (from Express). 
  // ! But if your route handler is async, it returns a Promise<Response>, which doesn't match what Express expects (which is just Promise<void> or void). 
  // ! So don't return it — just call it.
  const animeData = await nineAnime()
  res.status(200).json({ animeData });
});
app.listen(5174, () => {
  // server run on 5174
  console.log("app running on port 5174");
});
