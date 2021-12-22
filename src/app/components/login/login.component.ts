import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { tap } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }

  onSubmit(loginForm: NgForm): void {
    console.log(loginForm)
    
    if (!loginForm.valid) {
      return
    }

    const { username, password } = loginForm.value
    
    this.authService.doLogin(username, password)
      .pipe(
        tap(result => console.log(result))
      )
      .subscribe()
  }
}
