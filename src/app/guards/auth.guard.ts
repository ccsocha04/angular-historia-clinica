import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.userService.validateUser()
      .pipe(
        tap(resp => {
          if (!resp) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/login'); 
            })
          }
        })
      );
  }

}
