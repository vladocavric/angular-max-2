import {NgModel} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolverService} from './servers/server/server-resolver.service';

const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent, children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolverService}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  // {path: '404', component: PageNotFoundComponent},
  {path: '404', component: ErrorPageComponent, data: {message: 'nesto novo nesto divlje'}},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
    // RouterModule.forRoot(appRoute, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
