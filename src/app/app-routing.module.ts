import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LandingComponent } from './component/landing/landing.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: ['USER', 'ADMIN'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
