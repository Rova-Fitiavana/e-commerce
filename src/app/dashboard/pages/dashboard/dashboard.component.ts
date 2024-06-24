import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {ProductResponseBean} from "../../model/product-response-bean";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProductComponent} from "../../pop-up/update-product/update-product.component";
import {ProductParam} from "../../model/product-param";
import {AuthService} from "../../../authentification/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  categories: string[] = [];
  title = `Tableau de bord par catégorie`;
  productResponseBean: ProductResponseBean[] = [];
  isReadOnly = false;

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initDashboard();
    this.getAllProduct();
  }

  initDashboard() {
    this.dashboardService.getAllCategory()
      .subscribe(data => {
        this.categories = data;
        this.categories
          .map(category => this.dashboardService.getInCategory(category)
            .subscribe(data => {
              this.data = {
                labels: this.categories,
                datasets: [
                  {
                    data: this.categories.map(categoryCount => categoryCount.length),
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#9b59b6"
                    ],
                    hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#9b59b6"
                    ]
                  }
                ]
              };
            }, error => {
              console.log(error.message);
            }))
      });
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  getAllProduct() {
    this.dashboardService.getAllProduct()
      .subscribe(product => {
        this.productResponseBean = product;
      }, error => {
        console.log(error.message);
      });
  }

  onProductDetails(product: ProductParam) {
    product.isReadOnly = true;
    this.matDialog.open(UpdateProductComponent, {
      width: '650px',
      height: '650px',
      data: product
    })
  }

  onUpdateProduct(product: ProductParam, id: number) {
    product.isReadOnly = false;
    this.matDialog.open(UpdateProductComponent, {
      width: '650px',
      height: '650px',
      data: product
    }).afterClosed()
      .subscribe((result: ProductParam) => {
        if (result) {
          this.dashboardService.updateProduct(result, id).subscribe(data => {
          }, error => console.log(error.message))
        }
      });
  }

  onDeleteProduct(id: number) {
    this.dashboardService.deleteProduct(id).subscribe(() => {
      this.productResponseBean = this.productResponseBean.filter(product => product.id !== id);
    });
  }

  onAddProduct() {
    this.matDialog.open(UpdateProductComponent, {
      width: '650px',
      height: '650px',
    }).afterClosed()
      .subscribe((result: ProductParam) => {
        if (result) {
          this.dashboardService.addProduct(result).subscribe(data => {
          }, error => console.log(error.message))
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
