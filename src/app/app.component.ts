import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagemantUI';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private keycloak: KeycloakService){}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
  }

  login() {
    //this.router.navigate(['/home']);
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
