import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { LandingComponent } from './component/landing/landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from './component/dialog/add-employee/add-employee.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DeleteComponent } from './component/dialog/delete/delete.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'myapp',
        clientId: 'employee-management-angular',
      },
      initOptions: {
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/home'
      },loadUserProfileAtStartUp: false
    });
}
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    AddEmployeeComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    KeycloakAngularModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
