import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { Trending } from 'src/types/Movies';
import { moviesReceived } from '../movies.action';

export interface IMoviesState {
    movies: Trending | null;
}

export const initialMoviesState:IMoviesState = {
    movies: null
};

export const moviesReducer = createReducer(
    initialMoviesState,
    on(moviesReceived, (state, {movies}) => {
      return {...state, movies}
    })
);

export const MoviesFeatureKey = "selectedMovies"

export const selectMoviesState = createFeatureSelector<IMoviesState>(MoviesFeatureKey)

export const selectMoviesInfo = createSelector(
    selectMoviesState,
    (state: IMoviesState) => state.movies
);