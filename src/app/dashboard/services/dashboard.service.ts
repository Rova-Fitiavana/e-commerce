import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductResponseBean} from "../model/product-response-bean";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ProductParam} from "../model/product-param";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<string[]> {
    const url: string = 'https://fakestoreapi.com/products/categories'
    return this.http.get<string[]>(url);
  }

  getInCategory(category: string): Observable<ProductResponseBean> {
    const url: string = `https://fakestoreapi.com/products/category/${category}`;
    return this.http.get<ProductResponseBean>(url);
  }

  getAllProduct(): Observable<ProductResponseBean[]> {
    const url: string = `https://fakestoreapi.com/products`;
    return this.http.get<ProductResponseBean[]>(url);
  }
  deleteProduct(id: number): Observable<ProductResponseBean> {
    const url: string = `https://fakestoreapi.com/products/${id}`;
    return this.http.delete<any>(url);
  }
  updateProduct(productParam: ProductParam, id: number): Observable<ProductResponseBean> {
    const url: string = `https://fakestoreapi.com/products/${id}`;
    return this.http.put<ProductResponseBean>(url, productParam);
  }
  addProduct(productParam: ProductParam): Observable<ProductResponseBean> {
    const url: string = `https://fakestoreapi.com/products`;
    return this.http.post<ProductResponseBean>(url, productParam);
  }
}
