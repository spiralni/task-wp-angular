import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

import AppConfig from '../configs/app.config'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn: Subject<boolean> = new Subject<boolean>()

    constructor(private http: HttpClient) {
        
    }

    doLogin(username: string, password: string) {
        return this.http.post(
            AppConfig.authURI,
            {
                username,
                password
            }
        )
    }
}