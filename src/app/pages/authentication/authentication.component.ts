import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../../core/dataservice.service';
import { nameLengthValidator, passwordComplexityValidator } from '../../core/custom-validator';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  registrationForm:FormGroup;
  loginForm:FormGroup;
  showLoginForm=true;
  showRegForm=false;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  showLogin():void{
    this.showLoginForm=true;
    this.showRegForm=false;
  }
  showReg():void{
    this.showLoginForm=false;
    this.showRegForm=true;
  }

  onLoginSubmit():void{
    console.log(this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.dataService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response); 
          localStorage.setItem('token', response.token)
          localStorage.setItem('id', response.message.id);
          this.router.navigate(["admin-panel"])
          this.showLoginForm=false;
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
  onRegSubmit():void{    
    if (this.registrationForm.valid) {
      this.dataService.registration(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log(response); 
          this.registrationForm.reset();
          this.showLoginForm=true;
          this.showRegForm=false;
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.registrationForm.markAllAsTouched();
    }
  }
}
