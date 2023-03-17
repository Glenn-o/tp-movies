import { createAction, props } from '@ngrx/store';
import { User } from '../shared/services/users.service';

export const UserReceived = createAction('[User Component] UserReceived', props<{user: User | null}>());
