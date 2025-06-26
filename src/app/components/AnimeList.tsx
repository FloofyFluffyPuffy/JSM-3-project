import React from 'react';
import { useAnime } from './AnimeProvider';
import AnimeCard from './AnimeCard';

const AnimeList = () => {
  const { animeList, loading } = useAnime();

  if (loading)
    return <img className="tetoLoad" src="/tetoLogo.gif" alt="Loading..." />;

  return (
    <div className='animeList'>
      <section>
        <div className="cardContainer">
          {animeList.map((anime) => (
            <AnimeCard key={anime.title} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
