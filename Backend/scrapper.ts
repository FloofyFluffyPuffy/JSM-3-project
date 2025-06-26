import express, { Request, Response } from "express";
import { nineAnime } from "./anime";
import cors from "cors"; // frontend got blocked without cors so add here
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5174;
// Allow requests from your frontend origin (use '*' to allow all for dev)
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
}));
app.get("/", async (req: Request, res: Response): Promise<void> => {
  const searchTerm = req.query.searchTerm as string
  // req.query is an object containing all the query parameters from the URL.
  // So if the URL is ...?searchTerm=one+piece, 
  // then: req.query = { searchTerm: "one piece" }
  //async = web wait for data, or script run without data and explode
  // is root url localhost.....
  // !  res.status().json() sends the response and returns a Response object (from Express).
  // ! But if your route handler is async, it returns a Promise<Response>, which doesn't match what Express expects (which is just Promise<void> or void).
  // ! So don't return it — just call it.
  try {
    const animeData = await nineAnime(searchTerm); // pass searchTerm to anime.ts
    res.status(200).json({ animeData });
  } catch (error) {
    // 200 successful
    console.error("Failed to fetch anime data:", error);
    res.status(500).json({ error: "Internal Server Error" }); // 500 failed
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on port ${PORT}`);
  // Host on all interfaces (0.0.0.0) to be accessible externally
});
