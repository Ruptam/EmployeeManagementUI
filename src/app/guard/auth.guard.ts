import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  public userProfile : KeycloakProfile | null = null;
  constructor(
    protected readonly router: Router,
    protected readonly keycloak : KeycloakService
  ) {
    super(router, keycloak);
  }
  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    const requiredRoles = route.data.roles;

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => this.roles.includes(role));
  }
  
  
}
