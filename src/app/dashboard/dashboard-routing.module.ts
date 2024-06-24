import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ChartModule} from "primeng/chart";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {path: '', component: DashboardComponent}
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), MatGridListModule, ChartModule, CommonModule],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
