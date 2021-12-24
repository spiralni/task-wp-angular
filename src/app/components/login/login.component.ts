import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { Subscription, tap } from 'rxjs'
import { AuthService, TokenResponse } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false
  isLoggedInSubs: Subscription = new Subscription()
  loginSubscription: Subscription = new Subscription()

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedInSubs = this.authService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }

  onSubmit(loginForm: NgForm): void {
    console.log(loginForm)
    
    if (!loginForm.valid) {
      return
    }

    const { username, password } = loginForm.value
    
    this.loginSubscription = this.authService.doLogin(username, password)
      .pipe(
        tap(result => console.log(result)),
        tap(result => {
          if (result.success) {
            const expiresAt = moment().add(60*60*10,'second');

            localStorage.setItem('token', result.data.token);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
          }
        })
      )
      .subscribe(response => {
        this.router.navigate(['tasks'])
      })
  }

  ngOnDestroy(): void {
    this.isLoggedInSubs.unsubscribe()
    this.loginSubscription.unsubscribe()
  }
}
