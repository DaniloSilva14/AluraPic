import { Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

 @Injectable({ providedIn: 'root' })

 export class LoginGuard implements CanActivate{

  constructor(
    private userService: UserService,
    private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  Observable<boolean> | Promise<boolean>{

    if(this.userService.isLogged()){
      this.router.navigate(['user', this.userService.getUserName()]);
      return false;
    }
    return true;
  }

 }
