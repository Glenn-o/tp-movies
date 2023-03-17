import { createAction, props } from '@ngrx/store';
import { User } from '../shared/services/users.service';

export const moviesReceived = createAction('[Movie Component] MoviesReceived', props<{user: User | null}>());
