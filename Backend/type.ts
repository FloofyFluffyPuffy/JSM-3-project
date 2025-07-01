export interface Anime {
  title: string;
  image: string;
  newEp: string;
  SD: string;
  href: string
}
export interface Episode {
  order: string;
  id: string;
  title: string;
  href: string
}
export interface StreamData {
  title: string;
  image: string;
  status: string;
  type: string;
  desc: string;
  genres: string[];
  aired: string;
  episodes: Episode[];
  iframeSrc: string;
  score: string
  duration: string
  quality: string
  views: string
  studios: []
  aliases: []
}
