import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router : Router){}
	
    canActivate() {
        if (localStorage.getItem('isLoggedin') == "true") {
            return true;
        }
        
        this.router.navigate(['/login']);
        return false;
    }
}
