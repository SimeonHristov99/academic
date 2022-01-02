import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { catchError, shareReplay, tap } from 'rxjs';
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

        console.log(res)
        return

        if (!document.cookie) {
          console.log('ERROR: No cookie')
          return
        }

        const id = res.body.id
        const firstName = res.body.firstName

        if (!id) {
          console.log('ERROR: No user id!')
          return
        }

        if (!firstName) {
          console.log('ERROR: No first name!')
          return
        }


        localStorage.setItem('userId', res.body.firstName)
        localStorage.setItem('firstName', res.body.firstName)

        this.router.navigateByUrl(
          `/${res.body.role}${res.body.role === "user" ? `/courses` : ''}`
        )
      })
    )
  }

  logout() {
    document.cookie = 'auth=; Max-Age=0; path=/; domain=' + location.hostname;
    localStorage.clear()
  }

  getToken() {
    return document.cookie.split('=')[1]
  }

}
