import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

 


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    private _http: HttpClient
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this._http.get<any>("http://localhost:3000/registerUsers")
  
    .subscribe(
      (response) => {
        const user = response.find((a: any) => {
          return a.email === email && a.password === password;
        });

        if (user) {
          sessionStorage.setItem('email', email as string);

          this.router.navigate(['home']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
        }
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }


}
