import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../shared/password-match.directive';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  

  ngOnInit(): void {
    
    this.registerForm = this.fb.group({
      detailName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    })
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private _http: HttpClient
  ) { }

  registerForm: any;

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }
  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this._http.post<any>("http://localhost:3000/registerUsers", postData)
      .subscribe(
        (response) => {
          alert('Registration successful.'); 
          //this.toastr.success('Registration successful');
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (error) => {
          alert('Registration failed. Please try again.'); 
          //this.toastr.error('Registration failed. Please try again.');
        }
      );
  }
  

}