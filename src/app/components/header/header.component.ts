import { Component, OnInit } from '@angular/core';
import { AuthService, SimpleResponse } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }

  onLogOut() {
    this.authService.doLogout()
      .subscribe((res: SimpleResponse) => {
        if (res.success) {
          console.log('Logged out')
        }
      })
  }

}
