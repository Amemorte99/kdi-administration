import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/auth.service';
import { LoginValidator } from './loginValidators';
import { Users } from 'src/app/shared/models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(
    private authservices : AuthService,
    private fb:FormBuilder) {
      this.loginForm = this.fb.group({
        email:["", [Validators.required,LoginValidator.conditionValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }

  ngOnInit(): void {
  }

  onSubmitLoginForm(){
    console.log(this.loginForm.value)
    let body = new Users
    body.email = this.email?.value
    body.password = this.password?.value
    // this.authservices.loginUser(body).subscribe((response)=>{
    // })
    
  }
  get email(){
    return this.loginForm.get("email")
  }
  get password(){
    return this.loginForm.get("password")
  }
}
