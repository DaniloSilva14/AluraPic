import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
      private http: HttpClient,
      private userService: UserService  ) { }

    autenticate(userName: string, password: string) {

        return this.http
          .post(
            API + '/user/login',
            { userName, password },
            { observe: 'response' }
          )
          .pipe(tap(res => {
            const authToken = res.headers.get('x-access-token');
            this.userService.setToken(authToken);
            console.log(`User ${userName} authenticated with token ${authToken}`)
          }))

    }
}
