export type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  isLiked?: boolean;
};

export type Trending = {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};

export type Like = {
  id?: string;
  movieId: number;
  movieTitle: string;
  userId: string;
  username: string;
  createdAt: Date;
}

export type Score = {
  id?: string;
  movieId: string;
  userId: string;
  score: number;
  createdAt: Date;
}
