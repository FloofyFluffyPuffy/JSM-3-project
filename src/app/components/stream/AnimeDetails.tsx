import React from 'react'
import { useAnime } from '../anime/AnimeProvider'

const AnimeDetails = () => {
    const {scrapedStreamData} = useAnime()
  return (
    <div className='detailsContainer'>
        <img className='imageD' src={scrapedStreamData.image} alt={scrapedStreamData.title} />
        <div className='textD'>
            <div className='titleAliases'>
            <h1 className='titleD'>{scrapedStreamData.title}</h1>
            <p className="aliases">{scrapedStreamData.aliases.join(', ')}</p>
            </div>
            <div className='descD'>
                <p>{scrapedStreamData.desc}</p>
            </div>
            <div className='miscD'>
                <div>
                <p><span>Studios:</span> {scrapedStreamData.studios.join(', ')}</p>
                <p><span>Genre:</span> {scrapedStreamData.genres.join(', ')}</p>
                <p><span>Status:</span> {scrapedStreamData.status}</p>
                <p><span>Type:</span> {scrapedStreamData.type}</p>
                </div>
                <div>
                     <p><span>Views:</span> {scrapedStreamData.views}</p>
                <p><span>Score:</span> {scrapedStreamData.score.length > 0 ? scrapedStreamData.views : "N/A"}</p>
                <p><span>Duration:</span> {scrapedStreamData.duration}</p>
                <p><span>Quality:</span> {scrapedStreamData.quality}</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AnimeDetails