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
        this.setSession(res.body._id, res.headers.get('token'))
        console.log('Logged In!')
      })
    )
  }

  logout() {
    this.removeSession()
  }

  private setSession(userId: string, token: string | null) {
    if(!token) return

    localStorage.setItem('user-id', userId)
    localStorage.setItem('token', token)
  }

  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('token')
  }

}
