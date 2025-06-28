export interface Anime {
  title: string;
  image: string;
  newEp: string;
  SD: string;
  href: string
}
export interface Episode {
  ep: string;
  id: string;
  title: string;
}
export interface StreamData {
  title: string;
  image: string;
  status: string;
  type: string;
  genres: string[];
  aired: string;
  episodes: Episode[];
  iframeSrc: string;
}
