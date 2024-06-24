import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserParam} from "../../model/user-param";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  hide = true;
  readonly maxLength = 50;
  private timeout!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => this.clearErrorMessage())
  }

  onSubmit(): void {
    this.clearErrorMessage();
    if (this.loginForm.valid) {
      const userParam: UserParam = this.loginForm.value;
      this.authService.userLogin(userParam).subscribe(response => {
        if (response) {
          this.router.navigateByUrl(`/dashboard`);
        } else {
          this.errorMessage = `Informations d'identification invalides`;
        }
      }, err => {
        this.errorMessage = err.error;
      } )
    }
  }

  private clearErrorMessage() {
    this.errorMessage = '';
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }
}
