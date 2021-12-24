import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, Subject, Subscriber } from "rxjs"

import AppConfig from '../configs/app.config'

export interface SimpleResponse {
    success: boolean,
    message?: string,
    payload?: any
}

interface Token {
    token: string,
    user_display_name: string,
    user_email: string,
    user_nicename: string
}

export interface TokenResponse {
    success: boolean,
    data: Token
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLoggedIn: Subject<boolean> = new Subject<boolean>()

    constructor(private http: HttpClient) {
        
    }

    doLogin(username: string, password: string) {
        return this.http.post<TokenResponse>(
            AppConfig.authURI,
            {
                username,
                password
            }
        )
    }

    doLogout() {
        return new Observable<SimpleResponse>(subscriber => {
            localStorage.removeItem("token")
            localStorage.removeItem("expires_at")
    
            this.isLoggedIn.next(false)

            subscriber.next({
                success: true
            })
        })
    }

    getToken() {
        return new Observable<SimpleResponse>(subscriber => {
            const token = localStorage.getItem("token")
            subscriber.next({
                success: true,
                payload: token
            })
        })
    }

}