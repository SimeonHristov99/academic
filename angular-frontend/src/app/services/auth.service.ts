import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private webService: WebRequestService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // console.log(res.cookies.auth)
        // this.setSession()
        console.log('Logged In!')
      })
    )
  }

  logout() {
    this.removeSession()
  }

  getToken() {
    // use the cookie service here
  }

  private setSession(token: string | null) {
    if(!token) return

    localStorage.setItem('token', token)
  }

  private removeSession() {
    localStorage.removeItem('token')
  }

}
