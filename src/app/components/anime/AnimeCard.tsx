import { useContext } from "react"
import type { Anime } from "../../../../Backend/type"
import { useNavigate } from "react-router-dom"
interface CardData {
    anime: Anime
}
const AnimeCard = ({anime}: CardData) => {
  const navigate = useNavigate()
  const cleanHref = anime.href.replace(/^\/watch\//, '')
  return (
    <div className="animeCards" onClick={() => {navigate(`/watch/${encodeURIComponent(cleanHref)}`)}}>
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