import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiserviceService {

    constructor(private _http:HttpClient) { }

    getdata() {
        return this._http.get("https://api.themoviedb.org/3/movie/76341?api_key=498202a6bb5540555f8ae398a434f702")
    }
}