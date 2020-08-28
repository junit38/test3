import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['']);

const redirectToProfile = () => map(
  user => user ? ['profile', (user as any).uid] : true
);

const onlyAllowSelf = next => map(
  // tslint:disable-next-line: triple-equals
  user => (!!user && next.params.id == (user as any).uid) || ['']
);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToProfile
    }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: onlyAllowSelf
    }
  },
  {
    path: 'support/:id',
    component: SupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
