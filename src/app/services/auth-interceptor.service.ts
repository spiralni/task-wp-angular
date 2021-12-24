import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService, SimpleResponse } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getToken()
            .pipe(
                take(1),
                exhaustMap((res: SimpleResponse) => {
                    if (res.success) {
                        const reqClone = req.clone({
                            params: new HttpParams().set('Bearer Token', res.payload)
                        })

                        return next.handle(reqClone)
                    }

                    return next.handle(req)
                })
            )
    }

}