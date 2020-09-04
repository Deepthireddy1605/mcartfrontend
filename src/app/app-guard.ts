import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.services';
@Injectable({
   providedIn:'root'
})
export class LoginGuardService implements CanActivate {
    constructor(private appService: AppService, private router: Router) {
        // console.log("guard constructor")
     }
    canActivate(): boolean {
        if (this.appService.isUserLoggedIn()) {
            // console.log("in login guard")
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
 
