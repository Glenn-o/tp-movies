import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { filter, map, Observable, switchMap } from "rxjs";
import { createEffect } from "@ngrx/effects";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserReceived } from "./user.action";
import { UsersService } from "src/app/shared/services/users.service";
import firebase from 'firebase/compat/app';

@Injectable()
export class UserEffect {
    userConnected: Observable<Action> = createEffect(() => {
        return this.angularFireAuth.user.pipe(
            filter((user): user is firebase.User => { return !!user }),
            switchMap((user) => { return this.userService.getUserInfoById(user.uid) }),
            map((users) => { 
                return UserReceived({ user: users[0] })
            }))
    })
    constructor(private angularFireAuth: AngularFireAuth, private userService: UsersService){}
}