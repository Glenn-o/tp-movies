import { createAction, props } from '@ngrx/store';
import { Trending } from 'src/types/Movies';

export const MoviesReceived = createAction('[Movies Component] MoviesReceived', props<{movies: Trending | null}>());
