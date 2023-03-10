export type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
};

export type Trending = {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};
