import {RouterModule, Routes} from "@angular/router";
import {UserAuthComponent} from "./pages/user-auth/user-auth.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {path: '', component: UserAuthComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AuthentificationRoutingModule {
}
