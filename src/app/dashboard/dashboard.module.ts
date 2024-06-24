import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {ChartModule} from "primeng/chart";
import {MatDialogModule} from "@angular/material/dialog";
import { UpdateProductComponent } from './pop-up/update-product/update-product.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    ChartModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
