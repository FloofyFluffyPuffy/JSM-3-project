import GetAnime from './anime/GetAnimeData';
import AnimeList from './anime/AnimeList';
import Footer from './Footer';
const Body = () => {
  return (
    <div>
      <GetAnime />
      <AnimeList />
       <Footer />
    </div>
  );
};
 export default Body