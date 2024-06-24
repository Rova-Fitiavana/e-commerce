import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/authentification', pathMatch: 'full'},
  {
    path: 'authentification',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
