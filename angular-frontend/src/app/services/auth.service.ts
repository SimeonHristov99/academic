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

        const id = res.body.id
        let firstName = res.body.firstname
        
        if (!id) {
          console.log('ERROR: No user id!')
          return
        }
        
        if (!firstName) {
          firstName = email.split('@')[0]
        }
        
        localStorage.setItem('userId', id)
        localStorage.setItem('firstName', firstName)
        
        const prePath = res.body.role == 'admin' ? '/try_to_guess_who_is_here' : ''
        const role = res.body.role == 'organisation' ? 'organization' : res.body.role
        const options = res.body.role === "user" ? '/courses' : ''

        const fullPath = `${prePath}/${role}${options}`

        this.router.navigateByUrl(fullPath)  
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
