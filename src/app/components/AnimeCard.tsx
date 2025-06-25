import { useContext } from "react"
import type { Anime } from "../../../Backend/anime"
interface CardData {
    anime: Anime
}
const AnimeCard = ({anime}: CardData) => {
  return (
    <div className="animeCards">
        <div className="imgContainer">
            <img className="cardCover peer" src={anime.image} alt={anime.title}/>
        
            <img className="peartoPlay" src="/pearto.png" alt="" />
        </div>
        <p className="animeTitle">{anime.title}</p>
         <span className="Ep">{anime.newEp}</span> • <span className="SD">{anime.SD}</span> 
    </div>
  )
}

export default AnimeCard