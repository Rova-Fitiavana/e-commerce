import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {UserParam} from "../model/user-param";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private token: string | null = null;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  userLogin(userParam: UserParam): Observable<string> {
    return this.http.post<any>(this.apiUrl, userParam).pipe(map((response) => {
        return this.token = response.token
      },
      catchError(err => {
          console.error(err);
          return of(err);
        }
      )));
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    this.router.navigate(['/authentification']);
  }
}
