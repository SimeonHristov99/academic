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

        if (!document.cookie) {
          console.log('ERROR: No cookie')
          return
        }

        console.log('Logged In!')
        console.log(document.cookie)

        this.router.navigateByUrl('/user/courses')
        // add more according to role
      })
    )
  }

  logout() {
    document.cookie = 'auth=; Max-Age=0; path=/; domain=' + location.hostname;
  }

  getToken() {
    return document.cookie.split('=')[1]
  }

}
