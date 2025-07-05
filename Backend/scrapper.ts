import express, { Request, Response } from "express";
import { nineAnime } from "./scrapeScripts/anime";
import cors from "cors"; // frontend got blocked without cors so add here
import getStream from "./scrapeScripts/watch";
import { getNewIframe } from "./scrapeScripts/newIframe";
import { searchCardScript } from "./scrapeScripts/searchCard";
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5174;
// Allow requests from your frontend origin (use '*' to allow all for dev)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
  })
);
app.get("/", async (req: Request, res: Response) => {
  // app.get("/") — your Express app is listening for a GET request at the / route (i.e. http://localhost:5174/).
  const { searchTerm, page } = req.query;
  // req.query is an object containing all the query parameters from the URL.
  // So if the URL is ...?searchTerm=one+piece,
  // then: req.query = { searchTerm: "one piece" }
  //async = web wait for data, or script run without data and explode
  // is root url localhost.....
  // !  res.status().json() sends the response and returns a Response object (from Express).
  // ! But if your route handler is async, it returns a Promise<Response>, which doesn't match what Express expects (which is just Promise<void> or void).
  // ! So don't return it — just call it.
  try {
    if (searchTerm) {
      console.log("🔍 Search Mode:", searchTerm);
      // call your search scraping logic
      const data = await nineAnime(searchTerm as string);
       res.json({ animeData: data });
    } else {
      console.log("📄 Page Mode:", page);
      const data = await nineAnime("", page as string); // "" = no searchTerm
       res.json({ animeData: data });
    }
  } catch (error) {
    // 200 successful
    console.error("Failed to fetch anime data:", error);
    res.status(500).json({ error: "Internal Server Error" }); // 500 failed
  }
});
app.get("/watch/", async (req: Request, res: Response) => {
  const href = req.query.href as string;
  console.log("Backend received href:", href);
  try {
    const streamData = await getStream(href);
    res.status(200).json({ streamData });
  } catch (error) {
    console.error("Failed to fetch watch data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/updateIframe", async (req: Request, res: Response) => {
  const href = req.query.updateEP;

  try {
    if (typeof href !== "string") return; // stop the next line from tweaking on type
    const newIframe = await getNewIframe(href);
    res.status(200).json({ newIframe }); // good habit to put it in ({newIframe})
  } catch (error) {
    console.error("Failed to get new episode iframe.");
  }
});
app.get("/searchCard", async (req: Request, res: Response) => {
  const input = req.query.inputValue
  if (typeof input !== "string") return;
  const searchCardData = await searchCardScript(input)
   res.json({ searchCL: searchCardData });
})
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on port ${PORT}`);
  // Host on all interfaces (0.0.0.0) to be accessible externally
});
