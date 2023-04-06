export type MovieDetails = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: Array<{ id: number; name: string }>
}
