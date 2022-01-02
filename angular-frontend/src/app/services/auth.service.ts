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
        
        if(!document.cookie) {
          console.log('ERROR: No cookie')
          return
        }
        
        console.log('Logged In!')
        console.log('cookie:')
        console.log(document.cookie)

        this.router.navigateByUrl('/user/courses')
        // add more according to role
      })
    )
  }

  logout() {
    document.cookie = 'auth' + "=" +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }

  getToken() {
    return document.cookie.split('=')[1]
  }

}
